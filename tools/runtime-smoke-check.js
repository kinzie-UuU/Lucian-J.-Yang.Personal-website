const fs = require("fs");
const path = require("path");
const http = require("http");
const net = require("net");
const { spawn } = require("child_process");

const root = path.resolve(__dirname, "..");
const chromeCandidates = [
  process.env.CHROME_BIN,
  path.join(process.env.ProgramFiles || "", "Google", "Chrome", "Application", "chrome.exe"),
  path.join(process.env["ProgramFiles(x86)"] || "", "Google", "Chrome", "Application", "chrome.exe"),
  path.join(process.env.LOCALAPPDATA || "", "Google", "Chrome", "Application", "chrome.exe"),
  path.join(process.env.ProgramFiles || "", "Microsoft", "Edge", "Application", "msedge.exe"),
  path.join(process.env["ProgramFiles(x86)"] || "", "Microsoft", "Edge", "Application", "msedge.exe"),
].filter(Boolean);

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".mp4", "video/mp4"],
  [".mp3", "audio/mpeg"],
  [".woff2", "font/woff2"],
]);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getFreePort = () => new Promise((resolve, reject) => {
  const server = net.createServer();
  server.listen(0, "127.0.0.1", () => {
    const { port } = server.address();
    server.close(() => resolve(port));
  });
  server.on("error", reject);
});

const startServer = () => {
  const server = http.createServer((request, response) => {
    const requested = decodeURIComponent((request.url || "/").split("?")[0]);
    const safe = path.normalize(requested).replace(/^([/\\])+/, "");
    const filePath = path.resolve(root, safe || "index.html");

    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    const finalPath = fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()
      ? path.join(filePath, "index.html")
      : filePath;

    fs.readFile(finalPath, (error, content) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": mime.get(path.extname(finalPath).toLowerCase()) || "application/octet-stream",
      });
      response.end(content);
    });
  });

  return new Promise((resolve, reject) => {
    server.listen(0, "127.0.0.1", () => resolve(server));
    server.on("error", reject);
  });
};

const getJson = (url) => new Promise((resolve, reject) => {
  http.get(url, (response) => {
    let body = "";
    response.setEncoding("utf8");
    response.on("data", (chunk) => {
      body += chunk;
    });
    response.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  }).on("error", reject);
});

const waitForCdp = async (port) => {
  const url = `http://127.0.0.1:${port}/json/list`;
  let lastError;

  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const json = await getJson(url);
      const page = Array.isArray(json)
        ? json.find((target) => target.type === "page" && target.webSocketDebuggerUrl)
        : null;
      if (page) return page.webSocketDebuggerUrl;
    } catch (error) {
      lastError = error;
    }

    await delay(100);
  }

  throw lastError || new Error("Chrome DevTools page target did not become ready.");
};

const createCdp = (webSocketUrl) => new Promise((resolve, reject) => {
  const socket = new WebSocket(webSocketUrl);
  let id = 0;
  const pending = new Map();
  const onceListeners = new Map();
  const listeners = new Map();

  socket.addEventListener("open", () => {
    resolve({
      send(method, params = {}) {
        const messageId = ++id;
        socket.send(JSON.stringify({ id: messageId, method, params }));
        return new Promise((res, rej) => pending.set(messageId, { res, rej, method }));
      },
      once(method) {
        return new Promise((res) => {
          if (!onceListeners.has(method)) onceListeners.set(method, []);
          onceListeners.get(method).push(res);
        });
      },
      on(method, callback) {
        if (!listeners.has(method)) listeners.set(method, new Set());
        listeners.get(method).add(callback);
        return () => listeners.get(method)?.delete(callback);
      },
      close() {
        socket.close();
      },
    });
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);

    if (message.id && pending.has(message.id)) {
      const entry = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) entry.rej(new Error(`${entry.method}: ${message.error.message}`));
      else entry.res(message.result || {});
      return;
    }

    if (message.method && listeners.has(message.method)) {
      listeners.get(message.method).forEach((listener) => listener(message.params || {}));
    }

    if (message.method && onceListeners.has(message.method)) {
      const methodListeners = onceListeners.get(message.method);
      onceListeners.delete(message.method);
      methodListeners.forEach((listener) => listener(message.params || {}));
    }
  });

  socket.addEventListener("error", reject);
});

const evaluate = async (client, expression) => {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || "Runtime.evaluate failed.");
  }

  return result.result.value;
};

const describeRemoteValue = (remoteValue) => {
  if ("value" in remoteValue) return String(remoteValue.value);
  if (remoteValue.unserializableValue) return String(remoteValue.unserializableValue);
  return remoteValue.description || remoteValue.type || "";
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const main = async () => {
  const chrome = chromeCandidates.find((candidate) => fs.existsSync(candidate));
  assert(chrome, "Chrome or Edge was not found. Set CHROME_BIN to run this check.");
  assert(typeof WebSocket === "function", "This check requires Node.js with global WebSocket support.");

  const cdpPort = await getFreePort();
  const profile = path.join(process.env.TEMP || "C:\\tmp", `lucian-cdp-${Date.now()}`);
  fs.mkdirSync(profile, { recursive: true });

  const server = await startServer();
  const sitePort = server.address().port;
  const browser = spawn(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${profile}`,
    `--remote-debugging-port=${cdpPort}`,
    "about:blank",
  ], { stdio: "ignore" });

  let client;

  try {
    client = await createCdp(await waitForCdp(cdpPort));
    const consoleErrors = [];
    const pageErrors = [];
    const ignoredLogEntry = (entry) => /favicon\.ico/i.test(`${entry.url || ""} ${entry.text || ""}`);

    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Log.enable");

    client.on("Runtime.consoleAPICalled", ({ type, args = [] }) => {
      if (!["error", "assert"].includes(type)) return;
      consoleErrors.push(`${type}: ${args.map(describeRemoteValue).join(" ")}`);
    });
    client.on("Runtime.exceptionThrown", ({ exceptionDetails }) => {
      const stack = exceptionDetails?.stackTrace?.callFrames?.[0];
      const location = stack ? ` at ${stack.url}:${stack.lineNumber + 1}:${stack.columnNumber + 1}` : "";
      pageErrors.push(
        exceptionDetails?.exception?.description
        || `${exceptionDetails?.text || "Runtime exception"}${location}`
      );
    });
    client.on("Log.entryAdded", ({ entry }) => {
      if (entry?.level === "error" && !ignoredLogEntry(entry)) {
        pageErrors.push(entry.text || entry.url || "Log error");
      }
    });

    const loadEvent = client.once("Page.loadEventFired");
    await client.send("Page.navigate", { url: `http://127.0.0.1:${sitePort}/index.html` });
    await loadEvent;
    await delay(700);

    const localizedText = await evaluate(client, `(() => ({
      lang: document.documentElement.lang,
      navAbout: document.querySelector('[data-i18n="nav_about"] .pill-label')?.textContent?.trim()
        || document.querySelector('[data-i18n="nav_about"]')?.textContent?.trim(),
      firstWork: document.querySelector('[data-i18n="work_row_1_name"]')?.textContent?.trim(),
      footerName: document.querySelector('[data-i18n="meta_name"]')?.textContent?.trim()
    }))()`);
    assert(localizedText.lang === "zh-CN", `Chinese locale was not applied: ${JSON.stringify(localizedText)}`);
    assert(localizedText.navAbout === "关于", `Chinese nav text was not applied: ${JSON.stringify(localizedText)}`);
    assert(localizedText.firstWork === "23 年端午", `Chinese work text was not applied: ${JSON.stringify(localizedText)}`);
    assert(localizedText.footerName === "©杨钦鹏", `Chinese footer text was not applied: ${JSON.stringify(localizedText)}`);

    const entryButton = await evaluate(client, `(() => {
      const rect = document.querySelector('#entry-go')?.getBoundingClientRect();
      return rect ? {
        x: Math.round(rect.left + rect.width / 2),
        y: Math.round(rect.top + rect.height / 2)
      } : null;
    })()`);
    assert(entryButton, "Entry button was not found.");
    await client.send("Input.dispatchMouseEvent", {
      type: "mouseMoved",
      x: entryButton.x,
      y: entryButton.y,
    });
    await client.send("Input.dispatchMouseEvent", {
      type: "mousePressed",
      x: entryButton.x,
      y: entryButton.y,
      button: "left",
      clickCount: 1,
    });
    await client.send("Input.dispatchMouseEvent", {
      type: "mouseReleased",
      x: entryButton.x,
      y: entryButton.y,
      button: "left",
      clickCount: 1,
    });
    await delay(3600);
    assert(await evaluate(client, "document.body.classList.contains('has-entered')"), "Entry transition did not complete.");
    const musicState = await evaluate(client, "window.LucianAudio?.getBackgroundMusicState?.() || null");
    assert(musicState?.requested, `Background music was not requested after entry: ${JSON.stringify(musicState)}`);
    assert(musicState?.exists, `Background music audio node was not created: ${JSON.stringify(musicState)}`);
    assert(musicState?.src?.includes("audio/liquid-light-loop.mp3"), `Background music source is wrong: ${JSON.stringify(musicState)}`);
    assert(musicState?.loop, `Background music should loop: ${JSON.stringify(musicState)}`);
    assert(await evaluate(client, "Boolean(document.querySelector('#hero-cube'))"), "Packaging cube was not rendered.");
    assert(await evaluate(client, "document.querySelectorAll('.hero-card').length === 0"), "Legacy hero cards are still present.");
    const cubeState = await evaluate(client, `(() => {
      const cube = document.querySelector('#hero-cube');
      const style = cube ? getComputedStyle(cube) : null;
      return {
        faces: document.querySelectorAll('#hero-cube .hero-cube-face').length,
        transformStyle: style?.transformStyle || null,
        transform: style?.transform || null
      };
    })()`);
    assert(cubeState.faces === 6, `Packaging cube does not have 6 faces: ${JSON.stringify(cubeState)}`);
    assert(cubeState.transformStyle === "preserve-3d", `Packaging cube is not preserving 3D: ${JSON.stringify(cubeState)}`);

    const beforeWheel = await evaluate(client, "Math.round(window.scrollY)");
    const viewport = await evaluate(client, "({ x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) })");
    await client.send("Input.dispatchMouseEvent", {
      type: "mouseWheel",
      x: viewport.x,
      y: viewport.y,
      deltaY: 120,
      deltaX: 0,
    });
    await delay(450);
    const afterWheel = await evaluate(client, "Math.round(window.scrollY)");
    assert(afterWheel > beforeWheel, `Hero wheel did not scroll the page: before=${beforeWheel}, after=${afterWheel}`);

    const clickBottomNav = async (href) => {
      const startedAt = Date.now();
      await evaluate(client, `document.querySelector(${JSON.stringify(`.bottom-nav-item[href="${href}"]`)})?.click(); true;`);
      let snapshot = null;

      for (let attempt = 0; attempt < 24; attempt += 1) {
        await delay(50);
        snapshot = await evaluate(client, `(() => {
          const href = ${JSON.stringify(href)};
          const target = document.querySelector(href);
          return {
            href,
            navTransitionActive: document.body.classList.contains('nav-transition-active'),
            visibleOverlayCount: [...document.querySelectorAll('.nav-paper-transition, .nav-water-transition, .nav-water-copy')]
              .filter((el) => !el.hidden && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden').length,
            paperTransitionCount: document.querySelectorAll('.nav-paper-transition').length,
            activeHref: document.querySelector('.bottom-nav-item.is-active')?.getAttribute('href') || null,
            targetTop: target ? Math.round(target.getBoundingClientRect().top) : null,
            scrollY: Math.round(window.scrollY)
          };
        })()`);

        if (
          !snapshot.navTransitionActive
          && snapshot.visibleOverlayCount === 0
          && snapshot.paperTransitionCount === 0
          && snapshot.activeHref === href
        ) {
          break;
        }
      }

      return { ...snapshot, settledMs: Date.now() - startedAt };
    };

    const navSequence = {};
    for (const href of ["#about", "#services", "#works", "#contact"]) {
      navSequence[href] = await clickBottomNav(href);
      assert(!navSequence[href].navTransitionActive, `Bottom nav transition remained active after ${href}: ${JSON.stringify(navSequence[href])}`);
      assert(navSequence[href].visibleOverlayCount === 0, `Bottom nav overlay remained visible after ${href}: ${JSON.stringify(navSequence[href])}`);
      assert(navSequence[href].paperTransitionCount === 0, `Bottom nav paper transition was not cleaned up after ${href}: ${JSON.stringify(navSequence[href])}`);
      assert(navSequence[href].activeHref === href, `Bottom nav did not activate ${href}: ${JSON.stringify(navSequence[href])}`);
      assert(navSequence[href].settledMs < 750, `Bottom nav transition was too slow for ${href}: ${JSON.stringify(navSequence[href])}`);
    }

    const contactNav = navSequence["#contact"];

    await evaluate(client, "document.querySelector('#works-side-rail-toggle')?.click(); true;");
    await delay(250);
    const railOpen = await evaluate(client, `(() => ({
      open: document.querySelector('#works-side-rail')?.classList.contains('is-open'),
      expanded: document.querySelector('#works-side-rail-toggle')?.getAttribute('aria-expanded')
    }))()`);
    assert(railOpen.open && railOpen.expanded === "true", `Works rail did not open: ${JSON.stringify(railOpen)}`);

    await client.send("Input.dispatchKeyEvent", {
      type: "keyDown",
      key: "Escape",
      code: "Escape",
      windowsVirtualKeyCode: 27,
      nativeVirtualKeyCode: 27,
    });
    await delay(250);
    const railClosed = await evaluate(client, `(() => ({
      open: document.querySelector('#works-side-rail')?.classList.contains('is-open'),
      expanded: document.querySelector('#works-side-rail-toggle')?.getAttribute('aria-expanded')
    }))()`);
    assert(!railClosed.open && railClosed.expanded === "false", `Works rail did not close: ${JSON.stringify(railClosed)}`);

    await evaluate(client, "document.querySelector('#works-side-rail-toggle')?.click(); true;");
    await delay(200);
    await evaluate(client, "document.querySelector('.works-side-rail-item[data-category=\"gift\"]')?.click(); true;");
    await delay(700);
    const gallery = await evaluate(client, `(() => ({
      galleryOpen: document.body.classList.contains('work-gallery-open'),
      railOpen: document.querySelector('#works-side-rail')?.classList.contains('is-open'),
      title: document.querySelector('#work-gallery-title')?.textContent?.trim() || null
    }))()`);
    assert(gallery.galleryOpen && !gallery.railOpen, `Works gallery flow failed: ${JSON.stringify(gallery)}`);

    await evaluate(client, "window.LucianWorkGallery?.close?.(); true;");
    await delay(300);

    const readViewportHealth = async (label) => evaluate(client, `(() => {
      const bottomNav = document.querySelector('.bottom-nav');
      const navRect = bottomNav?.getBoundingClientRect();
      const navStyle = bottomNav ? getComputedStyle(bottomNav) : null;
      const doc = document.documentElement;
      const body = document.body;
      const horizontalOverflow = Math.max(doc.scrollWidth, body.scrollWidth) - window.innerWidth;
      const bottomItems = [...document.querySelectorAll('.bottom-nav-item')].map((item) => {
        const rect = item.getBoundingClientRect();
        const style = getComputedStyle(item);
        return {
          href: item.getAttribute('href'),
          visible: rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden',
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        };
      });
      return {
        label: ${JSON.stringify(label)},
        width: window.innerWidth,
        height: window.innerHeight,
        horizontalOverflow,
        entryVisible: getComputedStyle(document.querySelector('#entry-screen')).display !== 'none'
          && !document.body.classList.contains('has-entered'),
        visiblePaperTransitions: [...document.querySelectorAll('.nav-paper-transition')]
          .filter((el) => !el.hidden && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden').length,
        legacyHeroCards: document.querySelectorAll('.hero-card').length,
        cubeFaces: document.querySelectorAll('#hero-cube .hero-cube-face').length,
        cubeImageNodes: document.querySelectorAll('#hero-cube img, #hero-cube picture, .hero-cube-image, .hero-cube-panel').length,
        brokenImages: [...document.images].filter((img) => img.currentSrc && img.complete && img.naturalWidth === 0).map((img) => img.currentSrc),
        bottomNavVisible: Boolean(bottomNav && navRect.width > 0 && navRect.height > 0 && navStyle.opacity !== '0' && navStyle.visibility !== 'hidden'),
        bottomItems,
        overflowElements: [...document.body.querySelectorAll('*')]
          .map((el) => {
            const rect = el.getBoundingClientRect();
            return {
              tag: el.tagName.toLowerCase(),
              id: el.id || '',
              className: typeof el.className === 'string' ? el.className : '',
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width)
            };
          })
          .filter((item) => item.width > 0 && (item.left < -2 || item.right > window.innerWidth + 2))
          .slice(0, 12)
      };
    })()`);

    const desktopHealth = await readViewportHealth("desktop");
    assert(desktopHealth.horizontalOverflow <= 2, `Desktop has horizontal overflow: ${JSON.stringify(desktopHealth)}`);
    assert(!desktopHealth.entryVisible, `Entry screen remained visible after entering: ${JSON.stringify(desktopHealth)}`);
    assert(desktopHealth.visiblePaperTransitions === 0, `Paper transition remained visible: ${JSON.stringify(desktopHealth)}`);
    assert(desktopHealth.legacyHeroCards === 0, `Legacy hero cards remained in DOM: ${JSON.stringify(desktopHealth)}`);
    assert(desktopHealth.cubeFaces === 6 && desktopHealth.cubeImageNodes === 0, `Cube should be pure 6 faces: ${JSON.stringify(desktopHealth)}`);
    assert(desktopHealth.brokenImages.length === 0, `Broken images detected: ${JSON.stringify(desktopHealth)}`);
    assert(desktopHealth.bottomNavVisible, `Bottom nav is not visible on desktop: ${JSON.stringify(desktopHealth)}`);

    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await delay(500);
    const mobileHealth = await readViewportHealth("mobile");
    assert(mobileHealth.horizontalOverflow <= 2, `Mobile has horizontal overflow: ${JSON.stringify(mobileHealth)}`);
    assert(mobileHealth.bottomNavVisible, `Bottom nav is not visible on mobile: ${JSON.stringify(mobileHealth)}`);
    assert(mobileHealth.bottomItems.some((item) => item.href === "#works" && item.visible), `Works nav item should be visible on mobile: ${JSON.stringify(mobileHealth)}`);

    await client.send("Emulation.clearDeviceMetricsOverride");

    assert(pageErrors.length === 0, `Page errors were reported: ${pageErrors.join(" | ")}`);
    assert(consoleErrors.length === 0, `Console errors were reported: ${consoleErrors.join(" | ")}`);

    console.log(JSON.stringify({
      ok: true,
      localizedText,
      musicState,
      cubeState,
      navSequence,
      railOpen,
      railClosed,
      gallery,
      desktopHealth,
      mobileHealth,
    }, null, 2));
  } finally {
    if (client) client.close();
    browser.kill();
    server.close();
    await delay(250);

    const resolvedProfile = path.resolve(profile);
    const safeTemp = path.resolve(process.env.TEMP || "C:\\tmp");
    if (resolvedProfile.startsWith(`${safeTemp}${path.sep}`) && fs.existsSync(resolvedProfile)) {
      fs.rmSync(resolvedProfile, { recursive: true, force: true });
    }
  }
};

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});

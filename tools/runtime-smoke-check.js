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

const waitForState = async (read, predicate, {
  timeoutMs = 3600,
  intervalMs = 80,
  message = "State did not settle.",
} = {}) => {
  const startedAt = Date.now();
  let snapshot = await read();

  while (!predicate(snapshot)) {
    if (Date.now() - startedAt >= timeoutMs) {
      const renderedMessage = typeof message === "function" ? await message(snapshot) : message;
      throw new Error(`${renderedMessage}: ${JSON.stringify(snapshot)}`);
    }
    await delay(intervalMs);
    snapshot = await read();
  }

  return snapshot;
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
      firstWork: document.querySelector('.works-row[data-category="oem"] .works-row-name')?.textContent?.trim(),
      clientsFooterExists: Boolean(document.querySelector('.clients-footer-meta'))
    }))()`);
    assert(localizedText.lang === "zh-CN", `Chinese locale was not applied: ${JSON.stringify(localizedText)}`);
    assert(localizedText.navAbout === "关于", `Chinese nav text was not applied: ${JSON.stringify(localizedText)}`);
    assert(localizedText.firstWork === "23 年端午", `Chinese featured work text was not applied: ${JSON.stringify(localizedText)}`);
    assert(!localizedText.clientsFooterExists, `Clients footer should be removed: ${JSON.stringify(localizedText)}`);

    const readEntryState = () => evaluate(client, `(() => {
      const screen = document.querySelector('#entry-screen');
      const canvas = document.querySelector('#entry-key-canvas');
      const rect = canvas?.getBoundingClientRect();
      const progressFill = document.querySelector('#entry-progress-fill');
      const progressRect = progressFill?.getBoundingClientRect();
      return {
        entered: document.body.classList.contains('has-entered'),
        entering: document.body.classList.contains('is-entering'),
        unfolding: document.body.classList.contains('is-unfolding'),
        entryScrollLocked: document.body.classList.contains('is-entry-scroll-locked'),
        keyReady: document.body.classList.contains('entry-key-ready'),
        keyCanvasExists: Boolean(canvas),
        keyModelSource: canvas?.dataset.modelSrc || '',
        keyCanvasWidth: Math.round(rect?.width || 0),
        keyCanvasHeight: Math.round(rect?.height || 0),
        progressText: document.querySelector('#entry-progress')?.textContent?.trim() || '',
        progressWidth: Math.round(progressRect?.width || 0),
        screenVisible: Boolean(screen && getComputedStyle(screen).display !== 'none')
      };
    })()`);

    let entryState = await readEntryState();
    assert(entryState.keyCanvasExists, `3D key entry canvas was not found: ${JSON.stringify(entryState)}`);
    assert(entryState.keyModelSource.includes("models/entry-key.glb"), `3D key model source is wrong: ${JSON.stringify(entryState)}`);
    assert(entryState.keyCanvasWidth > 0 && entryState.keyCanvasHeight > 0, `3D key canvas is not visible: ${JSON.stringify(entryState)}`);

    for (let attempt = 0; attempt < 120 && (!entryState.entered || entryState.entryScrollLocked); attempt += 1) {
      await delay(100);
      entryState = await readEntryState();
    }

    assert(entryState.keyReady, `3D key model did not become ready: ${JSON.stringify(entryState)}`);
    assert(entryState.entered, `3D key auto entry did not complete: ${JSON.stringify(entryState)}`);
    assert(!entryState.entryScrollLocked, `Entry scroll lock did not release: ${JSON.stringify(entryState)}`);
    const musicState = await evaluate(client, "window.LucianAudio?.getBackgroundMusicState?.() || null");
    assert(musicState?.requested, `Background music was not requested after entry: ${JSON.stringify(musicState)}`);
    assert(musicState?.exists, `Background music audio node was not created: ${JSON.stringify(musicState)}`);
    assert(musicState?.src?.includes("audio/liquid-light-loop.mp3"), `Background music source is wrong: ${JSON.stringify(musicState)}`);
    assert(musicState?.loop, `Background music should loop: ${JSON.stringify(musicState)}`);
    assert(await evaluate(client, "document.querySelectorAll('.hero-card').length === 0"), "Legacy hero cards are still present.");

    let modelState = null;
    for (let attempt = 0; attempt < 80; attempt += 1) {
      modelState = await evaluate(client, `(() => {
        const host = document.querySelector('#hero-model-scene');
        const canvas = document.querySelector('#hero-model-canvas');
        const rect = canvas?.getBoundingClientRect();
        const ready = document.body.classList.contains('hero-model-ready');
        const model = window.LucianHeroModel || null;
        return {
          exists: Boolean(host),
          ready,
          source: host?.dataset.modelSrc || '',
          canvasWidth: Math.round(rect?.width || 0),
          canvasHeight: Math.round(rect?.height || 0),
          runtimeSource: model?.source || '',
          cubeNodes: document.querySelectorAll('#hero-cube, .hero-cube-scene, .hero-cube-face').length
        };
      })()`);
      if (modelState.exists && modelState.ready && modelState.canvasWidth > 0) break;
      await delay(100);
    }
    assert(modelState.exists, `Hero model scene was not rendered: ${JSON.stringify(modelState)}`);
    assert(modelState.ready, `Hero model did not become ready: ${JSON.stringify(modelState)}`);
    assert(modelState.source.includes("/models/lion_head/lion_head_2k.gltf"), `Hero model source is wrong: ${JSON.stringify(modelState)}`);
    assert(modelState.runtimeSource.includes("/models/lion_head/lion_head_2k.gltf"), `Hero model runtime source is wrong: ${JSON.stringify(modelState)}`);
    assert(modelState.cubeNodes === 0, `Old cube nodes should be removed: ${JSON.stringify(modelState)}`);

    const heroModelCanvasState = await evaluate(client, `(() => {
      const canvas = document.querySelector('#hero-model-canvas');
      const style = canvas ? getComputedStyle(canvas) : null;
      const rect = canvas?.getBoundingClientRect();
      return {
        display: style?.display || null,
        pointerEvents: style?.pointerEvents || null,
        width: Math.round(rect?.width || 0),
        height: Math.round(rect?.height || 0)
      };
    })()`);
    assert(heroModelCanvasState.width > 0 && heroModelCanvasState.height > 0, `Hero model canvas is not visible: ${JSON.stringify(heroModelCanvasState)}`);

    const beforeWheel = await evaluate(client, "Math.round(window.scrollY)");
    const viewport = await evaluate(client, "({ x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) })");
    await client.send("Input.dispatchMouseEvent", {
      type: "mouseWheel",
      x: viewport.x,
      y: viewport.y,
      deltaY: 120,
      deltaX: 0,
    });
    await delay(160);
    const heroHandoffStart = await evaluate(client, `(() => ({
      scrollY: Math.round(window.scrollY),
      handoffActive: document.body.classList.contains('hero-about-handoff-active'),
      curtainDown: document.querySelector('.hero-stage')?.classList.contains('is-curtain-down') || false
    }))()`);
    assert(heroHandoffStart.scrollY === beforeWheel, `Hero wheel should lock natural scroll before the curtain: ${JSON.stringify(heroHandoffStart)}`);
    assert(heroHandoffStart.handoffActive && heroHandoffStart.curtainDown, `Hero wheel did not start the black curtain: ${JSON.stringify(heroHandoffStart)}`);

    const readHeroHandoffEnd = () => evaluate(client, `(() => ({
      scrollY: Math.round(window.scrollY),
      handoffActive: document.body.classList.contains('hero-about-handoff-active'),
      handoffSettled: document.body.classList.contains('hero-about-handoff-settled'),
      aboutTop: Math.round(document.querySelector('#about')?.getBoundingClientRect().top || 0)
    }))()`);
    const heroHandoffEnd = await waitForState(
      readHeroHandoffEnd,
      (state) => state.scrollY > beforeWheel && !state.handoffActive && state.handoffSettled,
      {
        timeoutMs: 4200,
        message: `Hero handoff did not settle after curtain release; start=${JSON.stringify(heroHandoffStart)}`,
      }
    );
    assert(heroHandoffEnd.scrollY > beforeWheel, `Hero handoff did not land beyond the locked Hero: ${JSON.stringify(heroHandoffEnd)}`);
    assert(!heroHandoffEnd.handoffActive && heroHandoffEnd.handoffSettled, `Hero handoff did not settle after curtain release: ${JSON.stringify(heroHandoffEnd)}`);

    await client.send("Input.dispatchMouseEvent", {
      type: "mouseWheel",
      x: viewport.x,
      y: viewport.y,
      deltaY: -120,
      deltaX: 0,
    });
    await delay(160);
    const heroReturnStart = await evaluate(client, `(() => ({
      scrollY: Math.round(window.scrollY),
      handoffActive: document.body.classList.contains('hero-about-handoff-active'),
      returning: document.body.classList.contains('hero-about-handoff-returning'),
      curtainDown: document.querySelector('.hero-stage')?.classList.contains('is-curtain-down') || false,
      curtainRect: (() => {
        const rect = document.querySelector('.hero-curtain')?.getBoundingClientRect();
        return rect ? {
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
          height: Math.round(rect.height)
        } : null;
      })()
    }))()`);
    assert(heroReturnStart.handoffActive && heroReturnStart.returning && heroReturnStart.curtainDown, `About upward wheel did not start the return curtain: ${JSON.stringify(heroReturnStart)}`);
    assert(heroReturnStart.curtainRect && heroReturnStart.curtainRect.top <= 1, `Return curtain should cover the viewport top: ${JSON.stringify(heroReturnStart)}`);

    const readHeroReturnEnd = () => evaluate(client, `(() => ({
      scrollY: Math.round(window.scrollY),
      returning: document.body.classList.contains('hero-about-handoff-returning'),
      heroTop: Math.round(document.querySelector('.hero-section')?.getBoundingClientRect().top || 0),
      aboutTop: Math.round(document.querySelector('#about')?.getBoundingClientRect().top || 0)
    }))()`);
    const heroReturnEnd = await waitForState(
      readHeroReturnEnd,
      (state) => state.scrollY === beforeWheel && !state.returning && state.heroTop === 0,
      { timeoutMs: 4200, message: "Hero return did not settle at the locked Hero" }
    );
    assert(heroReturnEnd.scrollY === beforeWheel && !heroReturnEnd.returning && heroReturnEnd.heroTop === 0, `Hero return did not settle at the locked Hero: ${JSON.stringify(heroReturnEnd)}`);

    const navSettleBudgetMs = 900;
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

    const bottomNavHrefs = await evaluate(client, `(() => [...document.querySelectorAll('.bottom-nav-item')]
      .map((item) => item.getAttribute('href'))
      .filter(Boolean))()`);
    for (const href of ["#about", "#services", "#contact"]) {
      assert(bottomNavHrefs.includes(href), `Bottom nav is missing ${href}: ${JSON.stringify(bottomNavHrefs)}`);
    }

    const navSequence = {};
    for (const href of bottomNavHrefs) {
      navSequence[href] = await clickBottomNav(href);
      assert(!navSequence[href].navTransitionActive, `Bottom nav transition remained active after ${href}: ${JSON.stringify(navSequence[href])}`);
      assert(navSequence[href].visibleOverlayCount === 0, `Bottom nav overlay remained visible after ${href}: ${JSON.stringify(navSequence[href])}`);
      assert(navSequence[href].paperTransitionCount === 0, `Bottom nav paper transition was not cleaned up after ${href}: ${JSON.stringify(navSequence[href])}`);
      assert(navSequence[href].activeHref === href, `Bottom nav did not activate ${href}: ${JSON.stringify(navSequence[href])}`);
      assert(navSequence[href].settledMs < navSettleBudgetMs, `Bottom nav transition was too slow for ${href}: ${JSON.stringify(navSequence[href])}`);
    }

    const contactNav = navSequence["#contact"];

    const worksCategories = await evaluate(client, `(() => [...document.querySelectorAll('.works-row')].map((row) => ({
      category: row.dataset.category || '',
      mode: row.dataset.galleryMode || '',
      title: row.querySelector('.works-row-name')?.textContent?.trim() || '',
      featuredOnly: row.dataset.featuredOnly || ''
    })))()`);
    const expectedCategories = ["oem", "gift", "brand", "aigc", "aigc-video"];
    assert(
      expectedCategories.every((category) => worksCategories.some((row) => row.category === category)),
      `Works categories are incomplete: ${JSON.stringify(worksCategories)}`
    );
    assert(
      worksCategories.every((row) => row.featuredOnly === "true"),
      `Works showcase rows should be featured-only: ${JSON.stringify(worksCategories)}`
    );
    assert(
      ["23 年端午", "23 顺丰端午", "TYPE FIELD", "PROMPT BOARD", "AIGC VIDEO 01"].every((title) => worksCategories.some((row) => row.title === title)),
      `Works featured titles are incomplete: ${JSON.stringify(worksCategories)}`
    );
    await evaluate(client, "document.querySelector('.works-row[data-category=\"oem\"]')?.click(); true;");
    await delay(300);
    const servicesAccordion = await evaluate(client, `(() => ({
      galleryOpen: document.body.classList.contains('work-gallery-open'),
      overviewTitle: document.querySelector('.services-overview-title')?.textContent?.trim() || null,
      overviewBody: document.querySelector('.services-overview-body')?.textContent?.trim() || null,
      cardCount: document.querySelectorAll('.services-accordion-item').length,
      activeCardTitle: document.querySelector('.services-accordion-item.is-active .services-accordion-title')?.textContent?.trim() || null,
      activeCardBody: document.querySelector('.services-accordion-item.is-active .services-accordion-body')?.textContent?.trim() || null
    }))()`);
    assert(
      !servicesAccordion.galleryOpen
        && servicesAccordion.overviewTitle
        && servicesAccordion.overviewBody
        && servicesAccordion.cardCount === 6
        && servicesAccordion.activeCardTitle
        && servicesAccordion.activeCardBody,
      `Services accordion content failed: ${JSON.stringify(servicesAccordion)}`
    );
    const worksInfinite = await evaluate(client, `(() => ({
      canvas: Boolean(document.querySelector('#works-infinite-canvas')),
      section: Boolean(document.querySelector('#works-infinite')),
      runtime: Boolean(window.LucianWorkInfiniteGallery),
      title: document.querySelector('#works-infinite-title')?.textContent?.trim() || null,
      description: document.querySelector('#works-infinite-description')?.textContent?.trim() || null
    }))()`);
    assert(
      worksInfinite.section
        && worksInfinite.canvas
        && worksInfinite.runtime
        && worksInfinite.title
        && worksInfinite.description,
      `Works infinite gallery failed: ${JSON.stringify(worksInfinite)}`
    );

    await evaluate(client, "window.LucianWorkGallery?.close?.(); true;");
    await delay(300);

    await evaluate(client, "document.querySelector('#pixel-avatar')?.click(); true;");
    await delay(160);
    let replayState = await readEntryState();
    const replayStarted = {
      ...replayState,
      galleryOpen: await evaluate(client, "document.body.classList.contains('work-gallery-open')"),
    };
    assert(!replayStarted.entered, `Avatar did not return to the entry screen: ${JSON.stringify(replayStarted)}`);
    assert(replayStarted.screenVisible, `Entry screen was not visible after avatar click: ${JSON.stringify(replayStarted)}`);
    assert(!replayStarted.galleryOpen, `Works gallery stayed open after avatar reset: ${JSON.stringify(replayStarted)}`);
    assert(replayStarted.progressText !== "[100%]", `Entry key progress did not restart after avatar click: ${JSON.stringify(replayStarted)}`);

    for (let attempt = 0; attempt < 120 && (!replayState.entered || replayState.entryScrollLocked); attempt += 1) {
      await delay(100);
      replayState = await readEntryState();
    }

    assert(replayState.entered, `Entry key replay did not auto-enter after avatar click: ${JSON.stringify(replayState)}`);
    assert(!replayState.entryScrollLocked, `Entry key replay left scroll locked after avatar click: ${JSON.stringify(replayState)}`);

    for (let attempt = 0; attempt < 12; attempt += 1) {
      const navReady = await evaluate(client, `(() => {
        const nav = document.querySelector('.bottom-nav');
        const style = nav ? getComputedStyle(nav) : null;
        return Boolean(nav && style && style.opacity !== '0' && style.visibility !== 'hidden');
      })()`);
      if (navReady) break;
      await delay(100);
    }

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
        heroModelReady: document.body.classList.contains('hero-model-ready'),
        heroModelCanvas: Boolean(document.querySelector('#hero-model-canvas')),
        oldCubeNodes: document.querySelectorAll('#hero-cube, .hero-cube-scene, .hero-cube-face').length,
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
    assert(desktopHealth.heroModelReady && desktopHealth.heroModelCanvas, `Hero model should remain active: ${JSON.stringify(desktopHealth)}`);
    assert(desktopHealth.oldCubeNodes === 0, `Old cube nodes remained in DOM: ${JSON.stringify(desktopHealth)}`);
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
    for (const href of ["#about", "#services", "#contact"]) {
      assert(
        mobileHealth.bottomItems.some((item) => item.href === href && item.visible),
        `Bottom nav item should be visible on mobile for ${href}: ${JSON.stringify(mobileHealth)}`
      );
    }

    await client.send("Emulation.clearDeviceMetricsOverride");

    assert(pageErrors.length === 0, `Page errors were reported: ${pageErrors.join(" | ")}`);
    assert(consoleErrors.length === 0, `Console errors were reported: ${consoleErrors.join(" | ")}`);

    console.log(JSON.stringify({
      ok: true,
      localizedText,
      musicState,
      modelState,
      heroModelCanvasState,
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

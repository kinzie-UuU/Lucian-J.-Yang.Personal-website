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
  const listeners = new Map();

  socket.addEventListener("open", () => {
    resolve({
      send(method, params = {}) {
        const messageId = ++id;
        socket.send(JSON.stringify({ id: messageId, method, params }));
        return new Promise((res, rej) => pending.set(messageId, { res, rej, method }));
      },
      once(method) {
        return new Promise((res) => listeners.set(method, res));
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
      const listener = listeners.get(message.method);
      listeners.delete(message.method);
      listener(message.params || {});
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
    `http://127.0.0.1:${sitePort}/index.html`,
  ], { stdio: "ignore" });

  let client;

  try {
    client = await createCdp(await waitForCdp(cdpPort));
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.once("Page.loadEventFired").catch(() => {});
    await delay(700);

    await evaluate(client, "document.querySelector('#entry-go')?.click(); true;");
    await delay(3600);
    assert(await evaluate(client, "document.body.classList.contains('has-entered')"), "Entry transition did not complete.");

    await evaluate(client, "document.querySelector('.bottom-nav-item[href=\"#contact\"]')?.click(); true;");
    await delay(1800);
    const contactNav = await evaluate(client, `(() => ({
      navTransitionActive: document.body.classList.contains('nav-transition-active'),
      visibleOverlayCount: [...document.querySelectorAll('.nav-water-transition, .nav-water-copy')]
        .filter((el) => !el.hidden && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden').length,
      activeHref: document.querySelector('.bottom-nav-item.is-active')?.getAttribute('href') || null,
      contactTop: Math.round(document.querySelector('#contact').getBoundingClientRect().top),
      scrollY: Math.round(window.scrollY)
    }))()`);

    assert(!contactNav.navTransitionActive, `Contact transition remained active: ${JSON.stringify(contactNav)}`);
    assert(contactNav.visibleOverlayCount === 0, `Contact overlay remained visible: ${JSON.stringify(contactNav)}`);
    assert(contactNav.activeHref === "#contact", `Contact nav was not active: ${JSON.stringify(contactNav)}`);

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

    console.log(JSON.stringify({ ok: true, contactNav, railOpen, railClosed, gallery }, null, 2));
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

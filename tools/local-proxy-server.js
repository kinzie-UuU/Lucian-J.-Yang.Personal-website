const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const root = path.resolve(__dirname, "..");
const host = process.env.HOST || "127.0.0.1";
const preferredPort = Number(process.env.PORT || 4180);
const strictPort = Boolean(process.env.PORT);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".txt": "text/plain; charset=utf-8",
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Range",
};

function resolveRequest(requestUrl) {
  const url = new URL(requestUrl, `http://${host}:${preferredPort}`);
  const pathname = decodeURIComponent(url.pathname);
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const fullPath = path.resolve(root, `.${requestedPath}`);

  if (!fullPath.startsWith(root + path.sep) && fullPath !== root) {
    return null;
  }

  return fullPath;
}

const server = http.createServer((request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(204, corsHeaders);
    response.end();
    return;
  }

  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, {
      ...corsHeaders,
      "Allow": "GET, HEAD",
      "Content-Type": "text/plain; charset=utf-8",
    });
    response.end("Method not allowed");
    return;
  }

  const filePath = resolveRequest(request.url);
  const requestPath = decodeURIComponent((request.url || "/").split("?")[0]);

  if (requestPath === "/__lucian_proxy_ping") {
    const body = JSON.stringify({ ok: true, root });
    response.writeHead(200, {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Length": Buffer.byteLength(body),
      "X-LJY-Proxy": "1",
    });
    if (request.method === "HEAD") {
      response.end();
      return;
    }
    response.end(body);
    return;
  }

  if (!filePath) {
    response.writeHead(403, { ...corsHeaders, "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      response.writeHead(404, { ...corsHeaders, "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const baseHeaders = {
      ...corsHeaders,
      "Content-Type": types[ext] || "application/octet-stream",
      "Cache-Control": "no-store",
      "Accept-Ranges": "bytes",
    };
    const range = request.headers.range;

    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);

      if (!match) {
        response.writeHead(416, {
          ...baseHeaders,
          "Content-Range": `bytes */${stats.size}`,
        });
        response.end();
        return;
      }

      const [, startValue, endValue] = match;
      let start;
      let end;

      if (startValue === "") {
        const suffixLength = Number(endValue);
        start = Math.max(stats.size - suffixLength, 0);
        end = stats.size - 1;
      } else {
        start = Number(startValue);
        end = endValue === "" ? stats.size - 1 : Number(endValue);
      }

      if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end >= stats.size || start > end) {
        response.writeHead(416, {
          ...baseHeaders,
          "Content-Range": `bytes */${stats.size}`,
        });
        response.end();
        return;
      }

      response.writeHead(206, {
        ...baseHeaders,
        "Content-Range": `bytes ${start}-${end}/${stats.size}`,
        "Content-Length": end - start + 1,
      });

      if (request.method === "HEAD") {
        response.end();
        return;
      }

      fs.createReadStream(filePath, { start, end }).pipe(response);
      return;
    }

    response.writeHead(200, {
      ...baseHeaders,
      "Content-Length": stats.size,
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    fs.createReadStream(filePath).pipe(response);
  });
});

let attemptedPort = preferredPort;

function listen(port) {
  attemptedPort = port;
  server.listen(port, host, () => {
    console.log(`Local proxy server: http://${host}:${port}/index.html`);
  });
}

listen(preferredPort);

server.on("error", (error) => {
  const canFallback = error.code === "EADDRINUSE" && !strictPort && attemptedPort < preferredPort + 10;

  if (canFallback) {
    const nextPort = attemptedPort + 1;
    console.warn(`Port ${attemptedPort} is in use, trying ${nextPort}...`);
    listen(nextPort);
    return;
  }

  console.error(error.message);
  process.exit(1);
});

server.on("listening", () => {
  const { port } = server.address();
  console.log(`Local proxy health: http://${host}:${port}/__lucian_proxy_ping`);
  console.log(`Serving: ${root}`);
});

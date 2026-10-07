// Export MP4 1080×1920, 30 i/s : node render.mjs [sortie.mp4] [--frames 0,5.2,19.8]
// Nécessite playwright (Chromium) et ffmpeg.
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const fi = args.indexOf("--frames");
const stills = fi >= 0 ? args[fi + 1].split(",").map(Number) : null;
const out = args.find(a => a.endsWith(".mp4")) || join(root, "GNI-nouveau-logo-reel.mp4");
const FPS = 30, DURATION = 30;

const types = { ".html": "text/html", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".woff2": "font/woff2", ".js": "text/javascript" };
const server = createServer(async (req, res) => {
  try { const p = join(root, decodeURIComponent(req.url.split("?")[0])); const body = await readFile(p); res.writeHead(200, { "content-type": types[extname(p)] || "application/octet-stream" }); res.end(body); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const url = `http://localhost:${server.address().port}/index.html?render`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto(url);
await page.evaluate(() => window.ready);
const stage = await page.$("#stage");

if (stills) {
  for (const t of stills) {
    await page.evaluate(t => window.render(t), t);
    await stage.screenshot({ path: join(root, `apercu-${String(t).replace(".", "_")}s.png`) });
  }
} else {
  const ff = spawn("ffmpeg", ["-y", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "medium", "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });
  const total = FPS * DURATION;
  for (let f = 0; f < total; f++) {
    await page.evaluate(t => window.render(t), f / FPS);
    const buf = await stage.screenshot({ type: "jpeg", quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once("drain", r));
    if (f % 90 === 0) console.log(`image ${f}/${total}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on("close", r));
  console.log("Vidéo :", out);
}
await browser.close(); server.close();

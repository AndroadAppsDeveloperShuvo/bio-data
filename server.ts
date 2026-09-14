import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // ImgBB and external image resolver endpoint
  app.get("/api/resolve-image", async (req, res) => {
    try {
      const targetUrl = req.query.url as string;
      if (!targetUrl) {
        return res.status(400).json({ error: "Missing url parameter" });
      }

      // If already direct image link
      if (targetUrl.includes("i.ibb.co") || targetUrl.includes("i.ibb.co.com")) {
        return res.json({ success: true, directUrl: targetUrl });
      }

      let parsed: URL;
      try {
        parsed = new URL(targetUrl);
      } catch {
        return res.status(400).json({ error: "Invalid URL provided" });
      }

      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return res.status(400).json({ error: "Invalid URL protocol" });
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        return res.status(502).json({ error: `Failed to fetch page (${response.status})` });
      }

      const html = await response.text();

      // Check og:image
      const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
        || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
      if (ogMatch && ogMatch[1]) {
        return res.json({ success: true, directUrl: ogMatch[1] });
      }

      // Check link rel="image_src"
      const linkMatch = html.match(/<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["']/i)
        || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']image_src["']/i);
      if (linkMatch && linkMatch[1]) {
        return res.json({ success: true, directUrl: linkMatch[1] });
      }

      // Check twitter:image
      const twMatch = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)
        || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);
      if (twMatch && twMatch[1]) {
        return res.json({ success: true, directUrl: twMatch[1] });
      }

      // Check for <img id="image-viewer" or any <img src="https://i.ibb.co/..."
      const imgMatch = html.match(/<img[^>]+src=["'](https?:\/\/i\.ibb\.co[^"']+)["']/i);
      if (imgMatch && imgMatch[1]) {
        return res.json({ success: true, directUrl: imgMatch[1] });
      }

      // Check for any i.ibb.co URL inside the HTML
      const anyIbb = html.match(/https?:\/\/i\.ibb\.co(?:\.com)?\/[^\s"']+\.(?:jpg|jpeg|png|webp|gif)/i);
      if (anyIbb && anyIbb[0]) {
        return res.json({ success: true, directUrl: anyIbb[0] });
      }

      return res.status(404).json({ error: "Could not find direct image", originalUrl: targetUrl });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || "Failed to resolve image URL" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

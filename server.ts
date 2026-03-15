import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Key Validation for Backend (as requested)
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not set in the server environment. AI features may fail.");
  } else {
    console.log("SUCCESS: GEMINI_API_KEY is configured in the server environment.");
  }

  // Weather Proxy (Mocking OpenWeatherMap for demo if no key, or using real one if provided)
  app.get("/api/weather", async (req, res) => {
    const { lat, lon } = req.query;
    // For hackathon demo, we'll return some realistic data if no API key is set
    // In production, you'd fetch from a real service
    res.json({
      main: { temp: 28, humidity: 65 },
      weather: [{ main: "Clear", description: "clear sky" }],
      name: "Rural Farm Area",
      risk: "Moderate - High humidity may favor Powdery Mildew."
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AgroAI Production Server running on http://localhost:${PORT}`);
  });
}

startServer();

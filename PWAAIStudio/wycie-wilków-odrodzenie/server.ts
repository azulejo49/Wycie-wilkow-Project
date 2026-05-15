import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

// Mock Database Representation
// In a true database (e.g., PostgreSQL or Firestore), we'd have collections/tables:
// 1. Domains (id, name, region, status)
// 2. Interventions (id, domainId, type, required, target_node, reason, timestamp)
// 3. Telemetry (id, domainId, sensorType, payload, timestamp)

const db = {
  domains: [
    { id: "wilk", metrics: { nodes: 142, flux: "3.2TB/s", co2: "92.1%" } },
    { id: "zubr", metrics: { nodes: 87, flux: "1.8TB/s", co2: "70.4%" } },
    { id: "dzieciolek", metrics: { nodes: 204, flux: "5.1TB/s", co2: "65.8%" } },
    { id: "los", metrics: { nodes: 64, flux: "1.1TB/s", co2: "85.2%" } },
  ],
  actionLogs: [],
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ----- API Routes (Backend Structure) -----

  // Healthcheck endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", orchestrator: "Odrodzenie-OS", version: "1.4" });
  });

  // Get current ecological domain metrics
  app.get("/api/metrics/:domainId", (req, res) => {
    const domain = db.domains.find((d) => d.id === req.params.domainId);
    if (domain) {
      res.json(domain.metrics);
    } else {
      res.status(404).json({ error: "Domain not found" });
    }
  });

  // Process human-in-the-loop interventions
  app.post("/api/interventions", (req, res) => {
    const { domainId, action, targetNode } = req.body;
    
    // Log the action to the DB (simulation)
    const logEntry = {
      id: Date.now().toString(),
      domainId,
      action,
      targetNode,
      timestamp: new Date().toISOString(),
      status: action === "PROCEED" ? "EXECUTING_PROTOCOL" : "ABORTED_BY_OPERATOR"
    };

    // @ts-ignore
    db.actionLogs.push(logEntry);

    res.json({ success: true, logEntry });
  });

  // Fetch recent intervention logs
  app.get("/api/interventions", (req, res) => {
    res.json(db.actionLogs.slice(-50)); // Return last 50
  });

  // ----- Vite Middleware for Dev / Static serving for Prod -----
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SYS] Odrodzenie-OS Backend Server running on port ${PORT}`);
  });
}

startServer();

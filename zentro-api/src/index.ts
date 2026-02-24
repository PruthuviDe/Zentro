// ============================================================
// Zentro API - Express Backend Server
// Deployed on Railway - Handles custom backend logic
// ============================================================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { suggestionRouter } from "./routes/suggestion";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ---- Middleware ----

// Enable CORS for frontend communication
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Parse JSON request bodies
app.use(express.json());

// ---- Routes ----

// Health check endpoint
app.get("/", (_req, res) => {
  res.json({
    service: "Zentro API",
    status: "running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "healthy" });
});

// Suggestion routes
app.use("/api", suggestionRouter);

// ---- Start Server ----

app.listen(PORT, () => {
  console.log(`🚀 Zentro API running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Suggestion: http://localhost:${PORT}/api/suggestion`);
});

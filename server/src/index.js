const express = require("express");
const connectDB = require("./utils/db");
// Import routers here

// Init App
const app = express();

const PORT = process.env.PORT || 8080;

// Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.get("/", (req, res) => res.send("API running"));
// app.use(`${basePath}/matchup`, MatchupRouter);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}...`)
);

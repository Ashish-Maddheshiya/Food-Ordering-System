console.log("🔥 APP FILE LOADED");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

// Routes
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// ==========================
// Middleware
// ==========================
app.use(express.json());
app.use(cors());
app.use(helmet());

// ==========================
// Test Route
// ==========================
app.get("/check", (req, res) => {
    res.send("CHECK OK");
});

// ==========================
// Routes
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);

// ==========================
// Home Route
// ==========================
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

module.exports = app;
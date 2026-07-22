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

const corsOptions = {
    origin: [
        "https://food-ordering-frontend-production-e60a.up.railway.app",
        "http://localhost:3000",
        "http://127.0.0.1:5500"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: false
    })
);

// ==========================
// Test Route
// ==========================
app.get("/check", (req, res) => {
    res.send("CHECK OK");
});

// ==========================
// API Routes
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);

// ==========================
// Frontend Static Files
// ==========================
app.use(express.static(path.join(__dirname, "./frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend/index.html"));
});

// ==========================
// 404 Handler
// ==========================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

module.exports = app;
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Route Imports
const authRoutes = require("./routes/Auth");
const productRoutes = require("./routes/Product");
const orderRoutes = require("./routes/Order");
const cartRoutes = require("./routes/Cart");
const brandRoutes = require("./routes/Brand");
const categoryRoutes = require("./routes/Category");
const userRoutes = require("./routes/User");
const addressRoutes = require("./routes/Address");
const reviewRoutes = require("./routes/Review");
const wishlistRoutes = require("./routes/Wishlist");

// DB Connection
const { connectToDB } = require("./database/db");

// Initialize Express App
const server = express();

// Connect to MongoDB
connectToDB();

// ===== ✅ CORS CONFIGURATION =====
const allowedOrigins = [
  'https://e-commerce-n8w7.vercel.app', // your frontend on Vercel
  'http://localhost:3000'               // local development
];

server.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for origin: " + origin));
    }
  },
  credentials: true,
  exposedHeaders: ['X-Total-Count'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));
// ==================================

// Core Middlewares
server.use(express.json());
server.use(cookieParser());
server.use(morgan("tiny"));

// Routes
server.use("/auth", authRoutes);
server.use("/users", userRoutes);
server.use("/products", productRoutes);
server.use("/orders", orderRoutes);
server.use("/cart", cartRoutes);
server.use("/brands", brandRoutes);
server.use("/categories", categoryRoutes);
server.use("/address", addressRoutes);
server.use("/reviews", reviewRoutes);
server.use("/wishlist", wishlistRoutes);

// Root Route
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running." });
});

// ===== ✅ Start Server on Dynamic Port =====
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server [STARTED] at http://localhost:${PORT}`);
});

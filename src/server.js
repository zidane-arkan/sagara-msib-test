require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const clothesRoutes = require("./routes/clothesRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", clothesRoutes);

// Database Connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Listening on port : ${PORT}`));

require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Database Connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Listening on port : ${PORT}`));

const express = require("express");
const cors = require("cors");
const db = require("./config/mongoose");
require('dotenv').config();

// Starting express server.
const app = express();

// Use CORS to avoid CORS blocked error by browser.
app.use(cors({
    origin: "*"
}));

// Parsing UTF-8 encoding.
app.use(express.urlencoded({ extended: false }));
// Parsing JSON.
app.use(express.json());

// Using express router.
app.use("/", require("./routes/api.js"));

// Listening at PORT.
app.listen(8888, () => {
    console.log("Server started at 8888");
});
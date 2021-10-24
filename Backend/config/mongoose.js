const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/verification");

const db = mongoose.connection;

module.exports = db;
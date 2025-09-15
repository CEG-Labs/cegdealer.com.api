"use strict";

require("dotenv").config();
const mongoose = require("mongoose");
const server = require("./server.js");

// Connect to Mongo
const mongooseOptions = {};
mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

server.start(process.env.PORT || 3000);

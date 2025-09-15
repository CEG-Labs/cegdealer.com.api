"use strict";

const mongoose = require("mongoose");
require("mongoose-schema-jsonschema")(mongoose);

const users = mongoose.Schema({
  username: { type: String },
  password: { type: String },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  roles: {
    type: [String],
    lowercase: true,
    enum: ["student", "instructor"],
  },
  games: {
    type: [String],
    lowercase: true,
    enum: ["craps", "roulette", "blackjack", "baccarat", "poker", "pai-gow", "keno", "uth", "sic-bo"],
  },
});

module.exports = mongoose.model("users", users);

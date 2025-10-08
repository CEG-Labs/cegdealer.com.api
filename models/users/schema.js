"use strict";

const mongoose = require("mongoose");
require("mongoose-schema-jsonschema")(mongoose);

const users = mongoose.Schema({
  username: { type: String },
  password: { type: String },
  pin: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  status: { type: String, enum: ["Current Student", "Suspended", "Graduate", "Other", ""], default: "" },
  source: { type: String, default: "Regular" },
  checkins: { type: [Date], default: [] },
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

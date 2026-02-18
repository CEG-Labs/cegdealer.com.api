"use strict";

const mongoose = require("mongoose");
require("mongoose-schema-jsonschema")(mongoose);

const users = mongoose.Schema({
  // Removed: username field
  password: { type: String },
  pin: { type: String, unique: true, required: true },

  // Split name into first and last
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  // Identification
  idNumber: { type: String }, // Driver's License or State Issued ID Number

  // Contact Information
  email: { type: String },
  phone: { type: String },

  // US Address
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },

  // Foreign Address (single field for international addresses)
  foreignAddress: { type: String },

  // Status and Classification
  status: {
    type: String,
    enum: ["Current Student", "Suspended", "Graduate", "Other", ""],
    default: "",
  },
  source: { type: String, default: "Regular" },

  // Registration
  registrationDate: { type: Date },

  // Date restrictions
  endOfClassDate: { type: Date },
  endOfPracticeDate: { type: Date },

  // Session tracking
  sessions: [
    {
      checkin: { type: Date, required: true },
      checkout: { type: Date },
      hours: { type: Number },
    },
  ],

  // Roles and Games
  roles: {
    type: [String],
    lowercase: true,
    enum: ["student", "instructor"],
  },
  games: {
    type: [String],
    lowercase: true,
    enum: [
      "craps",
      "roulette",
      "blackjack",
      "baccarat",
      "poker",
      "pai-gow",
      "keno",
      "uth",
      "sic-bo",
    ],
  },
});

module.exports = mongoose.model("users", users);

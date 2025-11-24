"use strict";

const mongoose = require("mongoose");
require("mongoose-schema-jsonschema")(mongoose);

const settings = mongoose.Schema({
  // Array of statuses that cannot check in (e.g., ["Suspended", "Graduate"])
  blockedStatuses: {
    type: [String],
    default: ["Suspended"],
  },

  // Whether to enforce the "End of Class Date" field
  enforceClassEndDate: {
    type: Boolean,
    default: false,
  },

  // Whether to enforce the "End of Practice Date" field
  enforcePracticeEndDate: {
    type: Boolean,
    default: false,
  },

  // Other system settings can be added here
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("settings", settings);

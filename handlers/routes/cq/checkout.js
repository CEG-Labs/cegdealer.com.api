"use strict";

const models = require("../../../models/loader.js");

const routeDefinition = {
  path: "/api/v1/:model/:id/checkout",
  methods: ["post"],
  handler: handleCheckOut,
};

// ============================================
// CHECKOUT - Update current session with checkout time and calculate hours
// ============================================
async function handleCheckOut(req, res) {
  const model = req.params.model;
  const _id = req.params.id;
  const user = (await models[model].get({ _id }))[0] || {};

  let data = {};

  // Find the active session (most recent session without checkout)
  const activeSessionIndex = user.sessions.findIndex(
    (session) => session.checkin && !session.checkout
  );

  if (activeSessionIndex === -1) {
    res.statusCode = 400;
    data = { error: "No active session found. Please check in first." };
  } else {
    const activeSession = user.sessions[activeSessionIndex];
    const checkoutTime = new Date();
    const checkinTime = new Date(activeSession.checkin);

    // Calculate hours (difference in milliseconds / 1000 / 60 / 60)
    const hours = (checkoutTime - checkinTime) / (1000 * 60 * 60);

    // Update the session
    user.sessions[activeSessionIndex].checkout = checkoutTime;
    user.sessions[activeSessionIndex].hours = hours;

    await user.save();
    data = user;
    res.statusCode = 200;
    res.statusMessage = "ok";
  }

  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(data));
  res.end();
}

module.exports = routeDefinition;

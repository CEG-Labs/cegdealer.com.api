"use strict";

const models = require("../../../models/loader.js");

const routeDefinition = {
  path: "/api/v1/:model/:id/checkin",
  methods: ["post"],
  handler: handleCheckIn,
};

async function handleCheckIn(req, res) {
  const model = req.params.model;
  const _id = req.params.id;
  const user = (await models[model].get({ _id }))[0] || {};

  let data = {};

  if (!user) {
    res.statusCode = 404;
    res.statusMessage = "User not found";
  }

  // Check if there's already an active session (checkin without checkout)
  const hasActiveSession = user.sessions.some(
    (session) => session.checkin && !session.checkout
  );

  if (hasActiveSession) {
    res.statusCode = 404;
    data = {
      error: "User already has an active session. Please check out first.",
    };
  } else {
    user.sessions.push({
      checkin: new Date(),
      checkout: null,
      hours: null,
    });
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

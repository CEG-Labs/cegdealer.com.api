"use strict";

const models = require("../../../models/loader.js");

const routeDefinition = {
  path: "/api/v1/:model/:id/session/:sessionIndex",
  methods: ["delete"],
  handler: handleDeleteSession,
};

// ============================================
// CHECKOUT - Update current session with checkout time and calculate hours
// ============================================
async function handleDeleteSession(req, res) {
  const model = req.params.model;
  const _id = req.params.id;
  const user = (await models[model].get({ _id }))[0] || {};

  let data = {};

  if (!user) {
    res.statusCode = 404;
    data = { error: "User not found" };
  } else {
    const index = parseInt(req.params.sessionIndex);
    if (isNaN(index) || index < 0 || index >= user.sessions.length) {
      res.statusCode = 400;
      data = { error: "Invalid session index" };
    } else {
      user.sessions.splice(index, 1);
      await user.save();
      data = user;
      res.statusCode = 200;
    }
  }

  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(data));
  res.end();
}

module.exports = routeDefinition;

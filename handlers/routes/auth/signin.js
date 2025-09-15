"use strict";
const models = require("../../../models/loader.js");
const users = models.users;

async function handleLogin(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const response = await users.get({ username });
  const user = response[0] || {};

  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  res.statusMessage = "OK";
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(user));
  res.end();
}

const routeDefinition = {
  path: "/auth/signin",
  methods: ["post"],
  handler: handleLogin,
};

module.exports = routeDefinition;

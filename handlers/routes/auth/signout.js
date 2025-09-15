"use strict";

const models = require("../../../models/loader.js");
const users = models.users;

const routeDefinition = {
  path: "/auth/signout",
  methods: ["post"],
  handler: handleSignOut,
};

async function handleSignOut(req, res) {
  const id = parseInt(req.params.id, 10);

  // use the id to logout the user and return null data

  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  res.statusMessage = "OK";
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify({}));
  res.end();
}

module.exports = routeDefinition;

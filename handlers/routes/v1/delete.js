"use strict";

const models = require("../../../models/loader.js");

const routeDefinition = {
  path: "/api/v1/:model/:id",
  methods: ["delete"],
  handler: deleteOne,
};

async function deleteOne(req, res) {
  const model = req.params.model;
  const id = req.params.id;

  const data = (await models[model].delete(id)) || {};

  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  res.statusMessage = "OK";
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(data));
  res.end();
}

module.exports = routeDefinition;

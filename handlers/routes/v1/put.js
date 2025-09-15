"use strict";

const models = require("../../../models/loader.js");

const routeDefinition = {
  path: "/api/v1/:model/:id",
  methods: ["put"],
  handler: updateOne,
};

async function updateOne(req, res) {
  const model = req.params.model;
  const id = req.params.id;
  const body = req.body;
  const data = (await models[model].update(id, body)) || {};

  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  res.statusMessage = "OK";
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(data));
  res.end();
}

module.exports = routeDefinition;

"use strict";

const models = require("../../../models/loader.js");

const routeDefinition = {
  path: "/api/v1/:model",
  methods: ["get"],
  handler: getAll,
};

async function getAll(req, res) {
  const model = req.params.model;

  const query = req.query.mongoQuery ? JSON.parse(req.query.mongoQuery) : req.query;

  const data = await models[model].get(query);

  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  res.statusMessage = "OK";
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(data));
  res.end();
}
module.exports = routeDefinition;

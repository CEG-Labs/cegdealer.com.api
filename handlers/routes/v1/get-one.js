"use strict";

const models = require("../../../models/loader.js");

const routeDefinition = {
  path: "/api/v1/:model/:id",
  methods: ["get"],
  handler: getOne,
};

async function getOne(req, res) {
  const model = req.params.model;
  const _id = req.params.id;
  const data = (await models[model].get({ _id }))[0] || {};

  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  res.statusMessage = "OK";
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(data));
  res.end();
}

module.exports = routeDefinition;

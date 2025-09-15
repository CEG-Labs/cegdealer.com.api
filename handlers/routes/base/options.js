"use strict";

const routeDefinition = {
  path: "options",
  handler: optionsHandler,
  methods: ["options"],
};

function optionsHandler(req, res) {
  res.statusCode = 204;
  res.end();
}

module.exports = routeDefinition;

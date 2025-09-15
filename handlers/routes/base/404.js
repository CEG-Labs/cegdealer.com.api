"use strict";

const routeDefinition = {
  path: "404",
  handler: notFoundHandler,
  methods: ["get", "post", "put", "patch", "delete"],
};

function notFoundHandler(req, res) {
  const response = {
    status: 404,
    message: "Not Found",
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body || {},
  };

  res.setHeader("Content-Type", "text/html");
  res.statusCode = 404;
  res.statusMessage = "Not Found";
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(response));
  res.end();
}

module.exports = routeDefinition;

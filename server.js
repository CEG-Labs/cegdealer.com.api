"use strict";

const { server, io } = require("./_core/http.js");

const routes = require("./handlers/routes/loader.js");
const models = require("./models/loader.js");

const registerRoute = server.router.register;

routes.forEach((route) => {
  loadRoute(route);
});

function loadRoute(file) {
  const route = require(file);
  route.handler && registerRoute(route);
}

function start(port) {
  // events.startService(io);
  server.listen(port, () => console.log(`Server up on ${port}`));
}

function stop(callback) {
  server.close(callback);
}

// TODO: Let's find a way to run this through HTTP
process.on("uncaughtException", function (err) {
  console.error("Uncaught Exception:", err);
});

module.exports = { start, stop };

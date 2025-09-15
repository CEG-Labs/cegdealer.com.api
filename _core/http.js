"use strict";

const Q = require("./q");
const http = require("http");
const hash = require("object-hash");

const requests = require("./events");
const parser = require("./parser");
const router = require("./router");

// Start the HTTP and Socket.IO servers
const server = http.createServer(requestHandler);
server.router = router;

Q.start(server);
const io = Q.io;

async function requestHandler(req, res) {
  await parser(req);

  // Embed the socket.io server instance in the request context
  req.io = io;

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Max-Age", 2592000); // 30 days
  res.setHeader("Access-Control-Allow-Headers", "content-type");

  // Options requests need to be global, so we use a wildcard route
  if (req.context.method.match(/options/i)) {
    req.context.route = "options";
  }

  // Identify a unique "event" name for each route by hashing the method and route
  const requestHash = hash([req.context.method, req.context.route]);

  // Emit the request to the event emitter, which will (hopefully) have a listener
  requests.emit(requestHash, [req.context, res]);

  // TODO: Handle errors gracefully. Given that we're using Events, the server disconnects from the process so there's no "clientError" event thrown when something goes wrong.
}

module.exports = { server, io };

"use strict";
const fs = require("fs");
const path = require("path");

const routes = [];

// TODO: Make this hack proof, faster, etc.
// Dynamically load all route definitions from the handlers/routes directory
function requireAll(dirPath, modules = {}) {
  fs.readdirSync(dirPath).forEach((entry) => {
    const fullPath = path.join(dirPath, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      requireAll(fullPath, modules); // recurse into subdirectory
    } else if (fullPath.endsWith(".js")) {
      routes.push(fullPath);
    }
  });
}

requireAll(__dirname);

module.exports = routes;

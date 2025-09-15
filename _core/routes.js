"use strict";

const Route = require("route-parser");

const routes = [];

module.exports = {
  add: (route) => routes.push(new Route(route)),
  parse: (url) => {
    url = url.toLowerCase();
    let route = routes.find((route) => route.match(url)) || new Route("404");
    const params = route.match(url);
    return { route: route.spec, params: params };
  },
};

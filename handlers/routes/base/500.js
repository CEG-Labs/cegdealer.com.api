"use strict";

const routeDefinition = {
  path: "500",
  handler: errorHandler,
  methods: ["get", "post", "put", "patch", "delete"],
};

function errorHandler(req, res) {
  const errorMessage = `
    <html>
      <head>
        <title>500 Internal Server Error</title>
      </head>
      <body>
        <h1>500 Internal Server Error</h1>
        <p>Something went wrong on our end. Please try again later.</p>
      </body>
    </html>
  `;

  res.statusCode = 500;
  res.statusMessage = "Internal Server Error";
  res.setHeader("Content-Type", "text/html");
  res.write(errorMessage);
  res.end();
}

module.exports = routeDefinition;

const express = require("express");
const app = express();
const url = require("url");
// const os = require("os-utils");
const promBundle = require("express-prom-bundle");

const fact = require("./fact");

// Add the options to the prometheus middleware most option are for http_request_duration_seconds histogram metric
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: {
    project_name: "factoriel",
    project_type: "factorial_calculator_app",
  },
  promClient: {
    collectDefaultMetrics: {},
  },
});
// add the prometheus middleware to all routes
app.use(metricsMiddleware);

app.get("/", (req, res) => {
  res.send(
    "Welcome to Factorial Calculator application! Navigate to /fact?n=5 to calculate the factorial of 5. Thank you :)"
  );
});

app.get("/fact", (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  res.json({
    result: fact.factoriel(queryObject.n),
  });
});

// app.get("/metrics", (req, res) => {
//   let usage;
//   os.cpuUsage(function (v) {
//     usage = v;
//     res.json({ CPU: usage + "%", memory: os.totalmem() - os.freemem() });
//   });
// });

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

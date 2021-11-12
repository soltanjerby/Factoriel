const express = require("express");
const app = express();
const url = require("url");
const os = require("os-utils");
const fact = require("./fact");

app.get("/", (req, res) => {
  res.send("Hello from App Engine!");
});

app.get("/fact", (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  res.json({
    result: fact.factoriel(queryObject.n),
  });
});

app.get("/metrics", (req, res) => {
  let usage;
  os.cpuUsage(function (v) {
    usage = v;
    res.json({ CPU: usage + "%", memory: os.totalmem() - os.freemem() });
  });
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

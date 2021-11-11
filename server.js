const express = require("express");
const app = express();
const url = require("url");
const os = require("os-utils");

app.get("/", (req, res) => {
  res.send("Hello from App Engine!");
});

app.get("/fact", (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  let fact = 1;
  for (let i = 1; i <= queryObject.n; i++) {
    fact *= i;
  }
  res.json({
    result: fact,
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

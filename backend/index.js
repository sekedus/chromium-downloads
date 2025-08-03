const db = require("./db");
const express = require("express");
const scraper = require("./scraper");

const PORT = Number(process.env.PORT) || 3001;

const app = express();

app.use((req, res, next) => {
  res.setHeader("access-control-allow-origin", "*");

  next();
});

app.get("/builds", (req, res) => {
  const builds = db.getBuildsSummary();
  res.json(builds);
});

app.get("/builds/:version/:channel/:os", (req, res) => {
  const build = db.getBuild(req.params.version, req.params.channel, req.params.os);
  if (!build) return res.sendStatus(404);
  res.json(build);
});

console.log("Initializing");

console.log(db.initialize);

db.initialize()
  .then(() => {
    console.log("Starting scraping");
    scraper.start();

    app.listen(PORT, () => {
      console.log(`Backend listening on ${PORT}.`);
    });
  })
  .catch((e) => {
    console.error(e);
  });

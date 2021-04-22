const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

let accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./../../../tmp/access.log"),
  { flags: "a" }
);
const logger = morgan("tiny", { stream: accessLogStream });

module.exports = { logger };
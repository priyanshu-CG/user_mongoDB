const fs = require("fs");

const logger = ( req, res, next) => {
//   console.error(err);

  fs.appendFile(
    "log.txt",
    `New Request: [${new Date().toISOString()}] [${req.method}] ${
      req.url
    }\nRequest Body: ${JSON.stringify(req.body)}\n`,
    "utf8",
    (error, data) => {
      if (error) {
        console.error("Error writing log to file:", error);
      }
    }
  );

  next();
};

module.exports = {
  logger,
};

var express = require("express");
var cors = require("cors");
var app = express();

var whitelist = ["http://example1.com", "http://example2.com"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.get("/products/:id", cors(corsOptions), function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for a whitelisted domain." });
});

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});

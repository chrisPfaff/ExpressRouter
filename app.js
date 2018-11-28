let fs = require("fs");
let express = require("express");
let request = require("request");
let ejs = require("ejs");
let methodOverride = require("method-override");
let bodyParser = require("body-parser");
let morgan = require("morgan");
let app = express();
let port = 3000;
let routes = require("./routes/item");

app.set("view engine", "ejs");
require("dotenv").config();

app.use(morgan("tiny"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  methodOverride(function(req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use("/", routes);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

app.listen(process.env.PORT || port, function() {
  console.log("listening on port 3000");
});

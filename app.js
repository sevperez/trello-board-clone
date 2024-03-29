// EXPRESS - MAIN ENTRY POINT - app.js

// dependencies
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

// CSS pre-processing middleware dependencies
var stylus = require("stylus");
var nib = require("nib");

// routes
var routes = require("./routes/all");

// express app object
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// stylus middleware setup
app.use(stylus.middleware({
  src: path.join(__dirname, "public"),    // use path module to load public directory
  compile: function(str, p) {             // callback function for stylus string and path
    return stylus(str)                    // pass string to stylus and set filename to path
      .set("filename", p)
      .use(nib());                        // enable nib library
  }
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// use combined routes middleware
app.use("/", routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// specify basepath
app.locals.basedir = path.join(__dirname, "views");

module.exports = app;

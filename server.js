/**
 * Introduction to Human-Computer Interaction
 * Lab 2
 * --------------
 * Created by: Michael Bernstein
 * Last updated: December 2013
 */
// var PORT = 3000;

// Express is a web framework for node.js
// that makes nontrivial applications easier to build
var express = require("express");
// var handlebars = require('express3-handlebars');
var http = require("http");
var path = require("path");
var event = require("./static/js/addEvents");

// Create the server instance
var app = express();

// Print logs to the console and compress pages we send    Old stuff we need
app.use(express.logger());
app.use(express.compress());

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "static"));
// app.engine('handlebars', handlebars());
// app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser("Intro HCI secret key"));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, "static")));

// Return all pages in the /static directory
// whenever they are requested at '/'
// e.g., http://localhost:3000/index.html
// maps to /static/index.html on this machine
// app.use(express.static(__dirname + '/static'));
app.get("/event", event.eventsInfo);

// Start the server
//var port = process.env.PORT || PORT; // 80 for web, 3000 for development
// app.listen(port, function() {
// 	console.log("Node.js server running on port %s", port);
// });
http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});

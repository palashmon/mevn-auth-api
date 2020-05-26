var express = require("express");
var usersRouter = require("./users");

var app = express();
app.use("/users/", usersRouter);
module.exports = app;

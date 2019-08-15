const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const {check, validationResult} = require('express-validator');
const cookie = require("cookie");

const app = express();

const mongoDB = 'mongodb+srv://silina01:cSB42MnimhMneRSX@cshub-vtf1l.mongodb.net/test?retryWrites=true&w=majority' 

// connect to our database
mongoose.connect(mongoDB, { useNewUrlParser: true });

let defaultconnection = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
defaultconnection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set port
const port = 4200;

app.use(bodyParser.json()); // support json encoded bodies
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

// Set name of directory where angular distribution files are stored
const dist = '../dist/CSHubProject';
app.use(express.static(dist));

// Create server to listen for connections
const server = http.createServer(app);
server.listen(port, () => console.log("listening on port " + port));


// ----------------- security
// create session
const session = require("express-session");

const MongoStore = require("connect-mongo")(session);
app.use(
  session({
    secret: "SiEyHwWt5JGgFZOEamFp",
    store: new MongoStore({
      url: mongoDB,
      ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    }),
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, sameSite: true, secure: false }
  })
);

const isAuthenticated = function(req, res, next) {
  if (!req.session.id) return res.status(401).end("access denied");
  next();
};


//parse object id
var ObjectId = require("mongodb").ObjectId;

// ------------------------------
var userRoute = require('./routes/users-api.js');
app.use('/users',userRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;



require('dotenv').config({path: __dirname + '/.env'})
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const { check, validationResult } = require('express-validator');
const cookieParser = require("cookie-parser");
//const https = require('https');
const fs = require('fs');
const passport = require('passport');
const path = require('path');



const app = express();

var cors = require('cors');
var corsOptions = {
    origin: 'https://localhost:4200',
    credentials: true };

app.use(cors(corsOptions));





const mongoDB = process.env.MONGODBCONNECTION;

// connect to our database
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, });

let defaultconnection = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
defaultconnection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json()); // support json encoded bodies
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

// Set name of directory where angular distribution files are stored
const dist = '../dist/CSHubProject';
app.use(express.static(dist));

// Create server to listen for connections
const port = process.env.PORT || 4200;
const server = http.createServer(app);

server.listen(port);

// ----------------- security
// create session
const session = require("express-session");

app.get('/', function(req, res){
  res.redirect('/');
});

const MongoStore = require("connect-mongo")(session);
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    store: new MongoStore({
      url: mongoDB,
      //ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    }),
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, sameSite: true, secure: true }
  })
);





// ------------------------------
let authRoute = require('./routes/auth-api.js');
let widgetRoute = require('./routes/widgets-api.js');
let notesRoute = require('./routes/notes-api.js');
let docsRoute = require('./routes/docs-api.js');
let userRoute = require('./routes/user-api.js');
app.use('/auth', authRoute);
app.use('/widgets', widgetRoute);
app.use('/notes', notesRoute);
app.use('/docs', docsRoute);
app.use('/user', userRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});





module.exports = app;


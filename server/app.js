const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const { check, validationResult } = require('express-validator');
const cookieParser = require("cookie-parser");
const https = require('https');
const fs = require('fs');
const passport = require('passport');
const path = require('path');

require('dotenv').config()

const app = express();

var cors = require('cors');
var corsOptions = {
    origin: [process.env.CLIENT_URL],
    credentials: true };

app.use(cors(corsOptions));


const mongoDB = process.env.MONGODBCONNECTION;

// connect to our database
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, });

let defaultconnection = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
defaultconnection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set port
const port = process.env.PORT || 3001;

app.use(bodyParser.json()); // support json encoded bodies
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

// Set name of directory where angular distribution files are stored
const dist = '../dist/CSHubProject';
app.use(express.static(dist));

// Create server to listen for connections

//local host
//const server = http.createServer(app);
// https.createServer(app).listen(port, () => {
//   console.log('Listening...')
// })

http.createServer(app).listen(port, process.env.HOST, () => {
  console.log(`Listening on port ${port}...`)
})

//server.listen(port, () => console.log("listening on port " + port));


// ----------------- security
// create session
const session = require("express-session");


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
    saveUninitialized: false,
    name: 'CSHUBCookie',
    proxy: true,
    cookie: { httpOnly: false,  secure: true, sameSite: 'none'}
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


const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
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

const sanitizeFeild = function(field) {
  return validator.escape(field);
};

// helper functions to generate salt and hash for encryption
function generateSalt() {
  return crypto.randomBytes(16).toString("base64");
}

function generateHash(password, salt) {
  var hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  return hash.digest("base64");
}
// ------------------------------




// checks -----------------------
const checkAplha = function(input, req, res, next) {
  if (!validator.isAlphanumeric(input)) return res.status(400).end("bad input");
  next();
};


// ------------------------------


app.post("/login",(req, res, next) => {

  return res.status(200).json({
    message: "Success",
 
});
});


app.post("/signup",(req, res, next) => {

  /* const firstname = sanitizeFeild(req.body.firstname);
  const lastname = sanitizeFeild(req.body.lastname);
  const email = sanitizeFeild(req.body.email);
  const password = req.body.password; */

     return res.status(200).json({
      message: "Success",

  });


 /*  findOne("users", { _id: email }, function(err, user) {
    if (err) return res.status(500).json({ message: "Server Error" });
    if (user) {
      return res.status(409).json({ message: "Email is already in use" });
    }
    const salt = generateSalt();
    const hash = generateHash(password, salt);
    update(
      "users",
      { _id: email },
      {
        _id: email,
        salt,
        hash,
        firstname,
        lastname
      },
      { upsert: true },
      function(err) {
        if (err) return res.status(500).json({ message: "Server Error" });
        // start a session
        req.session.email = email;
        return res.status(200).json({
          message: "Success",
          email,
          firstname,
          lastname
        });
      }
    );
  }); */
});








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;


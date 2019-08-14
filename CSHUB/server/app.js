const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const crypto = require("crypto");
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

// helper functions to generate salt and hash for encryption
function generateSalt() {
  return crypto.randomBytes(16).toString("base64");
}

function generateHash(password, salt) {
  var hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  return hash.digest("base64");
}
// db models------------------------------

//parse object id
var ObjectId = require("mongodb").ObjectId;

const Users = require("./models/users.js");


// ------------------------------


app.post("/login",[
  check('email', 'Your email is not valid').not().isEmpty().trim().isEmail().normalizeEmail().isLength({ max: 50 }),
  check('password', 'Your password must be between 6-18 characters').not().isEmpty().isLength({ min: 6, max:18 })
],(req, res, next) => {

  
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const email = req.body.email;
  const password = req.body.password;

  Users.findById(email).exec(function (err, user) {
    if (err) return res.status(500).json({ message: "Server Error" });
    if (!user) return res.status(401).json({ message: "Invalid login" });
    if (user.hash !== generateHash(password, user.salt))
      return res.status(401).json({ message: "Invalid login" }); // invalid password
    // start a session
    req.session.id = user._id;
    return res.status(200).json({
      msg: "Success",
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname
    });
  });

 
});


app.post("/signup",[
  check('firstname', 'first name is too long or not valid').not().isEmpty().isAlpha().trim().escape().isLength({ max: 50 }),
  check('lastname', 'last name is too long or not valid').not().isEmpty().isAlpha().trim().escape().isLength({ max: 50 }),
  check('email', 'Your email is not valid').not().isEmpty().trim().isEmail().normalizeEmail().isLength({ max: 50 }),
  check('password', 'Your password must be between 6-18 characters').not().isEmpty().isLength({ min: 6, max:18 }),
], (req, res, next) => {

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
    
  Users.findById(email).exec(function (err, user) {
    if (err) return res.status(500).json({ message: "Server Error" });
    if (user) {
      return res.status(409).json({ message: "Email is already taken" });
    }
    const salt = generateSalt();
    const hash = generateHash(password, salt);

    const newUser = new Users({ _id: email, firstname, lastname, hash, salt });

    newUser.save(function(err) {
      if (err) return res.status(500).json({ message: "Server Error" });
      return res.json({ msg: "Success", _id: email, firstname, lastname });
    });
  });

});








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;


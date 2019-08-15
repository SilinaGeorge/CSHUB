var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator');
const crypto = require("crypto");

//mongodb model
const Users = require("../mongo-models/users.js");

// helper functions to generate salt and hash for encryption
function generateSalt() {
  return crypto.randomBytes(16).toString("base64");
}

function generateHash(password, salt) {
  var hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  return hash.digest("base64");
}

// format validation error
const errorFormatter = ({msg}) => {
  return `${msg}`;
};

// user login api call
router.post("/login",[
    check('email', 'Your email is not valid').not().isEmpty().trim().isEmail().normalizeEmail().isLength({ max: 50 }),
    check('password', 'Your password must be between 6-18 characters').not().isEmpty().isLength({ min: 6, max:18 })
  ],(req, res, next) => {
  
    // returns validation errors if there are any 
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.status(401).json({ msg: result.array() });
    }

    const email = req.body.email;
    const password = req.body.password;
  
    Users.findById(email).exec(function (err, user) {
      if (err) return res.status(500).json({ msg: "Server Error" });
      if (!user) return res.status(401).json({ msg: "Invalid login" });
      if (user.hash !== generateHash(password, user.salt))
        return res.status(401).json({ msg: "Invalid login" }); // invalid password
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
  
  // user signup api call
  router.post("/signup",[
    check('firstname', 'first name is too long or contains invalid characters (alpha only)').not().isEmpty().isAlpha().trim().escape().isLength({ max: 50 }),
    check('lastname', 'last name is too long or contains invalid characters (alpha only) ').not().isEmpty().isAlpha().trim().escape().isLength({ max: 50 }),
    check('email', 'Your email is not valid').not().isEmpty().trim().isEmail().normalizeEmail().isLength({ max: 50 }),
    check('password', 'Your password must be between 6-18 characters').not().isEmpty().isLength({ min: 6, max:18 }),
  ], (req, res, next) => {
  
    // returns validation errors if there are any 
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.status(401).json({ msg: result.array() });
    }
  
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
      
    Users.findById(email).exec(function (err, user) {
      if (err) return res.status(500).json({ msg: "Server Error" });
      if (user) {
        return res.status(409).json({ msg: "Email is already taken" });
      }
      const salt = generateSalt();
      const hash = generateHash(password, salt);
  
      const newUser = new Users({ _id: email, firstname, lastname, hash, salt });
  
      newUser.save(function(err) {
        if (err) return res.status(500).json({ msg: "Server Error" });
        return res.json({ msg: "Success", _id: email, firstname, lastname });
      });
      
    });

  });
  
  
  module.exports = router
  
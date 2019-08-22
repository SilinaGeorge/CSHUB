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

/* var schedule = require('node-schedule');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'silina_george@hotmail.com',
    pass: 'In7878,./'
  }
});

var mailOptions = {
  from: 'silina_george@hotmail.com',
  to: 'silina_george@hotmail.com',
  subject: 'CSHUB: Time to Get Crackng',
  text: 'Visit --insert prod link-- and start ur studying and job hunt./n This is an automated email,please do not reply back'
};

var date = new Date(2019, 7, 15, 23, 40, 0);
 
var j = schedule.scheduleJob(date, function(){
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}); */
 
// user login api call
router.post("/login",[
    check('_id', 'Your email is not valid').not().isEmpty().trim().isEmail().normalizeEmail().isLength({ max: 50 }),
    check('password', 'Your password must be between 6-18 characters').not().isEmpty().isLength({ min: 6, max:18 })
  ],(req, res, next) => {
  
    // returns validation errors if there are any 
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.status(401).json({ msg: result.array() });
      
    }

    const _id = req.body._id;
    const password = req.body.password;
  
    Users.findById(_id).exec(function (err, user) {
      if (err) return res.status(500).json({ msg: "Server Error" });
      if (!user) return res.status(401).json({ msg: "Email is not correct" });
      if (user.hash !== generateHash(password, user.salt))
        return res.status(401).json({ msg: "Password is not correct" }); // invalid password
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
    check('firstname', 'First name is too long or contains invalid characters (alpha only)').not().isEmpty().isAlpha().trim().escape().isLength({ max: 50 }),
    check('lastname', 'Last name is too long or contains invalid characters (alpha only) ').not().isEmpty().isAlpha().trim().escape().isLength({ max: 50 }),
    check('_id', 'Your email is not valid').not().isEmpty().trim().isEmail().normalizeEmail().isLength({ max: 50 }),
    check('password', 'Your password must be between 6-18 characters').not().isEmpty().isLength({ min: 6, max:18 }),
  ], (req, res, next) => {
  
    // returns validation errors if there are any 
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.status(401).json({ msg: result.array() });
    }
  
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const _id = req.body._id;
    const password = req.body.password;
      
    Users.findById(_id).exec(function (err, user) {
      if (err) return res.status(500).json({ msg: "Server Error" });
      if (user) {
        return res.status(409).json({ msg: "Email is already taken" });
      }
      const salt = generateSalt();
      const hash = generateHash(password, salt);
  
      const newUser = new Users({ _id, firstname, lastname, hash, salt });
  
      newUser.save(function(err) {
        if (err) return res.status(500).json({ msg: "Server Error" });
        return res.json({ msg: "Success", _id, firstname, lastname });
      });
      
    });

  });
  
  
  module.exports = router
  
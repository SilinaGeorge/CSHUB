var express = require('express')
var router = express.Router()
const { check, validationResult, param } = require('express-validator');
const crypto = require("crypto");
const passport = require('passport');
const social = require('../config/passport.js')(router, passport);
const url = require('url');
const ObjectId = require("mongodb").ObjectId;


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
const errorFormatter = ({ msg }) => {
  return `${msg}`;
};

/* var schedule = require('node-schedule');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'silina_george@hotmail.com',
    pass: '*********'
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
const isAuthenticated = function(req, res, next) {
  if (!req.session.userid){
    return res.status(401).json({ msgs: ["You Are Not Logged In"] });
  } 
  next();
};

const isAuthorized = function(req, res, next) {
  const id = req.params.id;
  if (req.session.userid != id){
    return res.status(403).json({ msgs: ["Access Denied"] });
  }
  next();
};

// user login api call
router.post("/login", [
  check('email', 'Your email is not valid').trim().isEmail().normalizeEmail().isLength({ max: 50 }).not().isEmpty(),
  check('password', 'Your password must be between 6-18 characters').isLength({ min: 6, max: 18 })
], (req, res, next) => {

  // returns validation errors if there are any 
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.status(400).json({ msgs: result.array() });

  }

  const email = req.body.email;
  const password = req.body.password;



  Users.findOne({ "email": email, "local": true }).exec(function (err, user) {
    if (err) return res.status(500).json({ msgs: ["Server Error"] });
    if (!user) return res.status(404).json({ msgs: ["Email is not correct"] });
    if (user.hash !== generateHash(password, user.salt))
      return res.status(401).json({ msgs: ["Password is not correct"] }); // invalid password
    // start a session
    req.session.userid = user._id;
    return res.status(200).json({
      msg: "Success",
      _id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname
    });
  });
});

// user local signup api call
router.post("/signup", [
  check('firstname', 'First name is too long or contains invalid characters (alpha only)').isAlpha().trim().escape().isLength({ max: 50 }).not().isEmpty(),
  check('lastname', 'Last name is too long or contains invalid characters (alpha only) ').isAlpha().trim().escape().isLength({ max: 50 }).not().isEmpty(),
  check('email', 'Your email is not valid').trim().isEmail().normalizeEmail().isLength({ max: 50 }).not().isEmpty(),
  check('password', 'Your password must be between 6-18 characters').isLength({ min: 6, max: 18 }),
], (req, res, next) => {

  // returns validation errors if there are any 
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.status(400).json({ msgs: result.array() });
  }

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  Users.findOne({ "email": email, "local": true }).exec(function (err, user) {
    if (err) return res.status(500).json({ msgs: ["Server Error"] });
    if (user) {
      return res.status(409).json({ msgs: ["Email is already taken"] });
    }
    const salt = generateSalt();
    const hash = generateHash(password, salt);

    const newUser = new Users({ email, 
      firstname, 
      lastname, 
      hash, 
      salt, 
      local: true, 
      facebook: false, 
      google: false, 
      spotifyurl: 'https://open.spotify.com/embed/playlist/37i9dQZF1CAjTirSpYapUx',
      notifications: [],
      spaceleft: 90000000
     });

    newUser.save(function (err, user) {
      if (err) return res.status(500).json({ msgs: ["Server Error"] });
      if (user) {
        req.session.userid = user._id;
        return res.status(200).json({ msg: "Success", 
        _id: user._id, 
        email: user.email, 
        firstname: user.firstname, 
        lastname: user.lastname, 
        spotifyurl: user.spotifyurl,
        notifications: user.notifications
      });
      }
    });

  });

});

// facebook login
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));


router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function (req, res) {

    req.session.userid = req.user._id;

    res.redirect("/#/social-redirect/?state=" + req.user._id);

  });


// google login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/'}),
  function (req, res) {
    req.session.userid = req.user._id;
    res.header()
    req.stat
    res.redirect("/#/social-redirect/?state=" + req.user._id);
  });



// get facebook/google user information
router.get('/social/:id', isAuthenticated ,isAuthorized, [
  param('id', 'Invalid ID').isAlphanumeric().trim().escape().not().isEmpty()
], (req, res, next) => {

  // returns validation errors if there are any 
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.status(400).json({ msgs: result.array() });
  }

  Users.findOne({ _id: ObjectId(req.params.id), local: false }, function (err, user) {
    if (err) return res.status(500).json({ msgs: ["Server Error"] });
    
    if (!user) return res.status(404).json({ msgs: ["Invalid ID"] });

    return res.status(200).json({
      msg: "Success", 
      _id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname
    });
  });
});


router.get('/logout', function (req, res, next) {
  
  if (req.session) {
    req.session.destroy(function(err) {
      res.clearCookie('connect.sid', { path: '/' });
      if(err) {
        return res.status(500).json([{ msgs: "logout failure" }])
      } else {
        return res.status(200).json({ msgs: "Success" })
      }
    });
  }
});

router.get('/checkloggedin', (req,res)=>{
  if (!req.session.userid) return res.status(200).json({ isloggedin: false });
  return res.status(200).json({ isloggedin: true });

})


module.exports = router

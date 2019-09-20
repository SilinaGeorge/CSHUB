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
router.post("/login", [
  check('email', 'Your email is not valid').trim().isEmail().normalizeEmail().isLength({ max: 50 }).not().isEmpty(),
  check('password', 'Your password must be between 6-18 characters').isLength({ min: 6, max: 18 })
], (req, res, next) => {

  // returns validation errors if there are any 
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.status(401).json({ msgs: result.array() });

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
      lastname: user.lastname,
      local: user.local,
      facebook: user.facebook,
      google: user.google,
      spotifyurl: user.spotifyurl
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
    return res.status(401).json({ msgs: result.array() });
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

    const newUser = new Users({ email, firstname, lastname, hash, salt, local: true, facebook: false, google: false, spotifyurl: 'https://open.spotify.com/embed/playlist/37i9dQZF1CAjTirSpYapUx' });

    newUser.save(function (err, user) {
      if (err) return res.status(500).json({ msgs: ["Server Error"] });
      if (user) {
        req.session.userid = user._id;
        return res.status(200).json({ msg: "Success", _id: user._id, email: user.email, firstname: user.firstname, lastname: user.lastname, local: user.local, facebook: user.facebook, google: user.google, spotifyurl: user.spotifyurl});
      }
    });

  });

});

// facebook login
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));


router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function (req, res) {

    /*      res.redirect(
          url.format({
            pathname: "/#/social-redirect/",
            query: { id: req.user._id },
          })
        );  */

        req.session.userid = req.user._id;

    res.redirect("/#/social-redirect/" + req.user._id);

  });


// google login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/'}),
  function (req, res) {
    req.session.userid = req._id
    //res.redirect("/#/social-redirect/" + req.user._id);
    res.redirect("https://localhost:4200/");
  });



// get facebook/google user information
router.get('/social/:id', [
  param('id', 'Invalid ID').isAlphanumeric().trim().escape().not().isEmpty()
], (req, res, next) => {

  // returns validation errors if there are any 
  const result = validationResult(req).formatWith(errorFormatter);

  if (!result.isEmpty()) {
    return res.status(401).json({ msgs: result.array() });
  }

  if (req.params.id !== req.session.userid)
    return res.status(401).json({ msgs: ["Access Denied"] });

  Users.findOne({ _id: ObjectId(req.params.id), local: false }, function (err, user) {
    if (err) return res.status(500).json({ msgs: ["Server Error"] });
    
    if (!user) return res.status(404).json({ msgs: ["Invalid ID"] });

    return res.status(200).json({
      msg: "Success", 
      _id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      social_id: user.social_id,
      facebook: user.facebook,
      google: user.google,
      local: user.local,
      spotifyurl: user.spotifyurl
    });
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});


module.exports = router

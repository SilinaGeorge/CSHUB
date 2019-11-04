var express = require('express')
var router = express.Router()
const { check, validationResult, param } = require('express-validator');

//mongodb model
const Users = require("../mongo-models/users.js");

// format validation error
const errorFormatter = ({ msg }) => {
  return `${msg}`;
};

const isAuthenticated = function(req, res, next) {
    if (!req.session.userid) return res.status(401).json({ msgs: ["You Are Not Logged In"] });
    next();
  };

const isAuthorized = function(req, res, next) {
  const id = req.params.id;
  if (req.session.userid != id){
    return res.status(403).json({ msgs: ["Access Denied"] });
  }
  next();
};


const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'hotmail.com',
  auth: {
    user: 'cshub-do-not-reply@hotmail.com',
    pass: 'CSHUBisthebest'
  },
  tls: {
    rejectUnauthorized: false
}
});



var date = new Date(2019, 7, 15, 23, 40, 0);
 



// spotify url change
router.patch("/spotify/:id",isAuthenticated,isAuthorized, [
  check('spotifyurl', 'invalid spotify playlist/album url').matches('https://open.spotify.com/album|playlist|station/[a-zA-Z0-9/=?]*'),
  param('id', 'Invalid ID').isAlphanumeric().trim().escape().not().isEmpty()
], (req, res, next) => {

  // returns validation errors if there are any 
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.status(400).json({ msgs: result.array() });
  }

  const id = req.params.id;
  const spotifyurl = req.body.spotifyurl;

  Users.findByIdAndUpdate(id,{spotifyurl}, {new: true}).exec(function (err, user) {
    if (err) return res.status(500).json({ msgs: ["Server Error"] });
    if (!user) return res.status(404).json({ msgs: ["User can't be found"] });

    return res.status(200).json({
      msg: "Success",
      _id: user._id,
      spotifyurl: user.spotifyurl
    });
  });
});


// add a new notification
router.put("/notif/:id",isAuthenticated, isAuthorized, [
  check('datetime', 'invalid datetime'),//.matches('/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/'),
  param('id', 'Invalid ID').isAlphanumeric().trim().escape().not().isEmpty()
], (req, res, next) => {

  // returns validation errors if there are any 
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.status(400).json({ msgs: result.array() });
  }
  const datetime = req.body.datetime;

  if (new Date(datetime) < new Date()) 
    return res.status(404).json({ msgs: ["Date has already passed"] });

  const id = req.params.id;

  Users.findOneAndUpdate(
  {_id:id, 'notifications.2': {'$exists': false}, notifications: { $not: {$in : [datetime]} }}, 
  {$addToSet: {notifications: datetime}}, 
  {new: true}).exec(function (err, user) {

    if (err) return res.status(500).json({ msgs: [err] });
    if (!user) return res.status(404).json({ msgs: ["You have a maximum of 3 notifications already or you have a notification with the same date already"] });

    /*
     const email = user.email;
      Users.findByIdAndUpdate(id,{$addToSet: {notifications: datetime}}, {new: true}).exec(function (err, user) {
        if (err) return res.status(500).json({ msgs: [err] });
        if (!user) return res.status(404).json({ msgs: ["User can't be found"] });

        let mailOptions = {
          from: 'cshub-do-not-reply@hotmail.com',
          to: 'cshub-do-not-reply@hotmail.com',
          subject: 'CSHUB: Time to Get Crackng',
          text: 'Visit --insert prod link-- and start studying. /n This is an automated email,please do not reply back'
        };

        let dateObj = new Date(datetime)

        let j = schedule.scheduleJob(dateObj, function(){
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        }); 
    */
    return res.status(200).json({
      msg: "Success",
      _id: user._id,
      datetime
    });
  });

});


// delete a notification
router.patch("/notif/delete/:id",isAuthenticated,isAuthorized, [
  check('datetime', 'invalid datetime'),//.matches('/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/'),
  param('id', 'Invalid ID').isAlphanumeric().trim().escape().not().isEmpty()
], (req, res, next) => {

  // returns validation errors if there are any 
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.status(400).json({ msgs: result.array() });
  }

  const id = req.params.id;
  const datetime = req.body.datetime;
  
  Users.findOneAndUpdate({_id:id, notifications:{$in : [datetime]}}, {$pull: {notifications: datetime}}, {new: true}).exec(function (err, user) {
    if (err) return res.status(500).json({ msgs: ["Server Error"] });
    if (!user) return res.status(404).json({ msgs: ["User can't be found or date does not exist in notifications"] });

    return res.status(200).json({
      msg: "Success",
      _id: user._id,
      datetime
    });
  });
});


module.exports = router
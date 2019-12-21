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




var date = new Date(2019, 7, 15, 23, 40, 0);
 

// get spotify url
router.get("/spotify/:id", isAuthorized, [
  param('id', 'Invalid ID').isAlphanumeric().trim().escape().not().isEmpty()
], (req, res, next) => { 

    // returns validation errors if there are any 
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.status(400).json({ msgs: result.array() });
    }
  
    const id = req.params.id;

    Users.findById(id,{spotifyurl: 1}).exec(function (err, result) {
      if (err) return res.status(500).json({ msgs: ["Server Error"] });
      if (!result) return res.status(404).json({ msgs: ["User can't be found"] });
  
      return res.status(200).json({
        msg: "Success",
        _id: result._id,
        spotifyurl: result.spotifyurl
      });
    });
});



// spotify url change
router.patch("/spotify/:id",isAuthenticated,isAuthorized, [
  check('spotifyurl', 'invalid spotify playlist/album url').matches('https://open.spotify.com/album|playlist|station/[a-zA-Z0-9/=?-_]*'),
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

// get notifications

router.get('/notifs/:id',isAuthorized,[
  param('id', 'Invalid ID').isAlphanumeric().trim().escape().not().isEmpty()
], (req,res)=>{
    // returns validation errors if there are any 
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.status(400).json({ msgs: result.array() });
    }

    const id = req.params.id;

    Users.findById(id,{notifications: 1}).exec(function (err, result) {
    
        if (err) return res.status(500).json({ msgs: [err] });
        if (!result) return res.status(404).json({ msgs: ["You have a maximum of 3 notifications already or you have a notification with the same date already"] });
    
        return res.status(200).json({
          msg: "Success",
          _id: result._id,
          notifications: result.notifications
        });
      });
});

const transporter = nodemailer.createTransport({
  service: 'gmail.com',
  secure:true,
  auth: {
    user: 'cshub.do.not.reply@gmail.com',
    pass: 'CSHUBisthebest'
  },
  tls: {
    rejectUnauthorized: false
}
});


var scheduleJobs = {}
// add a new notification
router.put("/notif/:id",isAuthenticated, isAuthorized, [
  check('datetime', 'invalid datetime').trim().not().isEmpty(),//.matches('/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/'),
  param('id', 'Invalid ID').isAlphanumeric().trim().escape().not().isEmpty()
], (req, res, next) => {

  // returns validation errors if there are any 
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.status(400).json({ msgs: result.array() });
  }
  const datetime = req.body.datetime;

  if (new Date(datetime) == 'Invalid Date') return res.status(404).json({ msgs: ["invalid date format"] });
  if (new Date(datetime) < new Date()) 
    return res.status(404).json({ msgs: ["Date has already passed"] });

  const id = req.params.id;

  Users.findOneAndUpdate(
  {_id:id, 'notifications.2': {'$exists': false}, notifications: { $not: {$in : [datetime]} }}, 
  {$addToSet: {notifications: datetime}}, 
  {new: true}).exec(function (err, user) {

    if (err) return res.status(500).json({ msgs: [err] });
    if (!user) return res.status(404).json({ msgs: ["You have a maximum of 3 notifications already or you have a notification with the same date already"] });

    
     const email = user.email;
      Users.findByIdAndUpdate(id,{$addToSet: {notifications: datetime}}, {new: true}).exec(function (err, user) {
        if (err) return res.status(500).json({ msgs: [err] });
        if (!user) return res.status(404).json({ msgs: ["User can't be found"] });

        let htmlContent = `
                <h1><strong>Study Time</strong></h1>
                <p>Hi ${user.firstname},</p>
                <br/>
                <a href='https://cs--hub.herokuapp.com/'>Time to study</a>
                `

        let mailOptions = {
          from: 'cshub.do.not.reply@gmail.com',
          to: "silina_george@hotmail.com",
          subject: 'CSHUB: Time to Get Crackng',
          //text: 'Visit --insert prod link-- and start studying. /n This is an automated email,please do not reply back'
          html: htmlContent
        };

        let dateObj = new Date(datetime)

        let j = schedule.scheduleJob(dateObj, function(){

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);

               //delete from db
              Users.findOneAndUpdate({_id:id, notifications:{$in : datetime}}, {$pull: {notifications: {$in:datetime}}}, {new: true}).exec(function (err, user2) {
                if (err) console.log('Server error trying to delete email from db')
                if (!user) console.log("User can't be found or date does not exist in notifications");
              
                console.log(`Sent and Deleted ${datetime} for ${user2._id}`)
                delete scheduleJobs[`${user2._id}_${datetime}`]

              
              }); 


            }
          });
        }); 

        scheduleJobs[`${user._id}_${datetime}`] = j
    
    return res.status(200).json({
      msg: "Success",
      _id: user._id,
      datetime
    });
  });
});

});


// delete a notifications
router.patch("/notifs/delete/:id",isAuthenticated,isAuthorized, [
  check('datetimes', 'Invalid datetimes').isArray({min:1,max:3}),//.matches('/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/'),
  param('id', 'Invalid ID').isAlphanumeric().trim().escape().not().isEmpty()
], (req, res, next) => {

  // returns validation errors if there are any 
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.status(400).json({ msgs: result.array() });
  }

  const id = req.params.id;
  const datetimes = req.body.datetimes;

  datetimes.forEach(datetime => {
    if (new Date(datetime) == 'Invalid Date') return res.status(404).json({ msgs: ["invalid date format"] });
  });
  
  
  Users.findOneAndUpdate({_id:id, notifications:{$all : datetimes}}, {$pull: {notifications: {$in:datetimes}}}, {new: true}).exec(function (err, user) {
    if (err) return res.status(500).json({ msgs: ["Server Error"] });
    if (!user) return res.status(404).json({ msgs: ["User can't be found or date does not exist in notifications"] });
    
    datetimes.forEach(dt => {
      if (scheduleJobs[`${user._id}_${dt}`]){
        scheduleJobs[`${user._id}_${dt}`].cancel()
        delete scheduleJobs[`${user._id}_${dt}`]
      }

        
      
    });

    return res.status(200).json({
      msg: "Success",
      _id: user._id,
      datetimes
    });
  });
});


module.exports = router
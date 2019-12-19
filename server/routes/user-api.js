var express = require('express')
var router = express.Router()
const { check, validationResult, param, query } = require('express-validator');


//mongodb model
const Users = require("../mongo-models/users.js");



// format validation error
const errorFormatter = ({ msg }) => {
  return `${msg}`;
};

const isAuthenticated = function (req, res, next) {
  if (!req.session.userid) return res.status(401).json({ msgs: ["You Are Not Logged In"] });
  next();
};

const isAuthorized = function (req, res, next) {
  const id = req.params.id;
  if (req.session.userid != id) {
    return res.status(403).json({ msgs: ["Access Denied"] });
  }
  next();
};

const isAuthorizedBody = function (req, res, next) {
  const id = req.body.userId;
  if (req.session.userid != id) {
    return res.status(403).json({ msgs: ["Access Denied"] });
  }
  next();
};


router.get('/space/:id', isAuthorized,[
    param('id', 'Invalid ID').isAlphanumeric().trim().escape().not().isEmpty()
] ,(req,res)=>{

      // returns validation errors if there are any 
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
        return res.status(400).json({ msgs: result.array() });
    }
    const id = req.params.id;

    Users.findById(id, {spaceleft:1}).exec(function (err, user) {
        if (err) return res.status(500).json({ msgs: ["Server Error"] });
        if (!user) return res.status(404).json({ msgs: ["invalid user"] });

        return res.status(200).json({
            msg: "Success",
            spaceleft: user.spaceleft
          });

    });
  
  });





module.exports = router
var express = require('express')
var router = express.Router()
const { check, validationResult, param, query } = require('express-validator');
var moment = require('moment')

//mongodb model
const Notes = require("../mongo-models/notes.js");


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

const isAuthorizedBody = function(req, res, next) {
    const id = req.body.userId;
    if (req.session.userid != id){
        return res.status(403).json({ msgs: ["Access Denied"] });
    }
    next();
};


// add a new note for a user
router.post("/:id",isAuthenticated, isAuthorized, [
    check('name', 'name is invalid').trim().escape().isLength({ max: 50 }).not().isEmpty(),
    check('description', 'description is invalid').trim().escape().isLength({ max: 210 }).not().isEmpty(),
    check('content', 'invalid content').escape().not().isEmpty(),
    check('topic', 'invalid topic').trim().escape().isLength({ max: 50 }).not().isEmpty(),
    param('id', 'Invalid ID').isAlphanumeric().trim().escape().not().isEmpty()
  ], (req, res, next) => {
  
    // returns validation errors if there are any 
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.status(400).json({ msgs: result.array() });
    }
    const date = new Date();

    const newNote = new Notes ({
        userId: req.params.id,
        content: req.body.content,
        description: req.body.description,
        name: req.body.name,
        topic: req.body.topic,
        dateCreate: date,
        dateModified: date,
        dateCreateString:  moment(date).format(("D/M/YYYY h:mm:ss a")),
        dateModifiedString: moment(date).format(("D/M/YYYY h:mm:ss a"))

    })

    newNote.save(function (err, result) {
        if (err) return res.status(500).json({ msgs: [err] })
        if (result){
            return res.status(200).json({
                msg: "Success",
                noteId: result._id,
                userId: result.userId,
                content: result.content,
                description: result.description,
                name: result.name,
                topic: result.topic,
                dateCreateString: result.dateCreateString,
                dateModifiedString: result.dateCreateString
    
              });
        }


    });
  });

// delete a note for a user
router.delete("/:id",isAuthenticated,isAuthorizedBody, [
    check('userId', 'userId is invalid').isAlphanumeric().trim().escape().not().isEmpty(),
    param('id', 'Invalid ID').isAlphanumeric().trim().escape().not().isEmpty()
  ], (req, res, next) => {

    
  
    // returns validation errors if there are any 
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.status(400).json({ msgs: result.array() });
    }
  
    const noteId = req.params.id;
    const userId = req.body.userId;
    
    Notes.findOneAndDelete({_id: noteId, userId:userId}).exec(function (err, result) {
      if (err) return res.status(500).json({ msgs: ["Server Error"] });
      if (!result) return res.status(404).json({ msgs: ["There is no note with that id for this user"] });
  
      return res.status(200).json({
        msg: "Success",
        noteId
      });
    });
  });
  
  // get all notes for a user
  router.get("/:id",isAuthenticated,isAuthorized, [
    param('id', 'Invalid ID').isAlphanumeric().trim().escape().not().isEmpty(),
    query('topic', 'topic is invalid').optional().isAlphanumeric().trim().escape(),
  ], (req, res, next) => {

  
    // returns validation errors if there are any 
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.status(400).json({ msgs: result.array() });
    }
  
    const userId = req.params.id;
    const topic = req.query.topic;
    let query = (topic !=null) ? {userId: userId,  topic: topic} : {userId: userId};
    
    Notes.find(query).sort({dateModified: -1}).exec(function (err, result) {
      if (err) return res.status(500).json({ msgs: ["Server Error"] });
      if (!result) return res.status(404).json({ msgs: ["Invalid user"] });
  
      return res.status(200).json({
        msg: "Success",
        notes: result
      });
    });
  });



    // update note
    router.patch("/:id",isAuthenticated,isAuthorizedBody, [
      param('id', 'Invalid ID').isAlphanumeric().trim().escape().not().isEmpty(),
      check('userId', 'userId is invalid').isAlphanumeric().trim().escape().not().isEmpty(),
      check('name', 'name is invalid').trim().escape().isLength({ max: 50 }).not().isEmpty(),
      check('description', 'description is invalid').trim().escape().isLength({ max: 210 }).not().isEmpty(),
      check('content', 'invalid content').escape().not().isEmpty(),
    ], (req, res, next) => {
  
    
      // returns validation errors if there are any 
      const result = validationResult(req).formatWith(errorFormatter);
      if (!result.isEmpty()) {
        return res.status(400).json({ msgs: result.array() });
      }
    
      const noteId = req.params.id;
      const userId = req.body.userId;

      const date = new Date();
      
      const update = {
        name: req.body.name,
        content: req.body.content,
        description: req.body.description,
        dateModified: date,
        dateModifiedString: moment(date).format(("D/M/YYYY h:mm:ss a"))
      }
      
      Notes.findOneAndUpdate({_id: noteId, userId: userId}, update).exec(function (err, result) {
        if (err) return res.status(500).json({ msgs: ["Server Error"] });
        if (!result) return res.status(404).json({ msgs: ["Invalid user or note"] });
    
        return res.status(200).json({
          msg: "Success",
          updatedNote: result
        });
      });
    });
  

  module.exports = router
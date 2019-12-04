var express = require("express");
var router = express.Router();
const { check, validationResult, param, query } = require("express-validator");
var moment = require("moment");

//mongodb model
const Docu = require("../mongo-models/docs.js");

//var upload    = require('../upload-doc.js/index.js');

// format validation error
const errorFormatter = ({ msg }) => {
  return `${msg}`;
};

const isAuthenticated = function(req, res, next) {
  if (!req.session.userid)
    return res.status(401).json({ msgs: ["You Are Not Logged In"] });
  next();
};

const isAuthorized = function(req, res, next) {
  const id = req.params.id;
  if (req.session.userid != id) {
    return res.status(403).json({ msgs: ["Access Denied"] });
  }
  next();
};

const isAuthorizedBody = function(req, res, next) {
  const id = req.body.userId;
  if (req.session.userid != id) {
    return res.status(403).json({ msgs: ["Access Denied"] });
  }
  next();
};

// add a new doc for a user
/* var upload    = require('../upload-doc');

router.post('/upload/:id',isAuthenticated, isAuthorized, (req, res, next) =>{

  upload(req, res,(error) => {
    if(error){
       return res.status(200).json({ msgs:['An error as occured'] });
    }else{
      if(req.file == undefined){
        return res.status(200).json({ msgs:["No file is given"] });
      }else{
           
          
           // Create new record in mongoDB
          
          return res.status(200).json({ msgs:["success"] });
  
    }
  }
});
}) 

router.get("/:id/:docId", isAuthenticated, isAuthorized, (req, res, next) => {
  res.sendFile("./uploads/1575336016891-doc.doc", { root: __dirname });
});*/


var fileUpload = require("express-fileupload");
router.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 }}));

var fs    = require('fs');


router.post("/:id",isAuthenticated,isAuthorized,[
  check('name', 'name is invalid').trim().escape().isLength({ max: 50 }).not().isEmpty(),
  check('description', 'description is invalid').trim().escape().isLength({ max: 210 }),
  check('topic', 'invalid topic').trim().escape().isLength({ max: 50 }).not().isEmpty(),
  param('id', 'Invalid ID').isAlphanumeric().trim().escape().not().isEmpty(),

],(req, res) => {
  //check to see if file exists and if it has the correct extention

  let date = new Date();

  var newDoc = new Docu({ 
    userId: req.params.id,
    file: req.files.doc.data,
    filename: req.files.doc.name,
    mimetype: req.files.doc.mimetype,
    filesize: req.files.doc.size,
    description: req.body.description,
    name: req.body.name,
    topic: req.body.topic,
    dateCreate: date,
    dateModifiedString: moment(date).format(("D/M/YYYY h:mm:ss a"))
  });

  newDoc.save(function(err, result) {
    if (err) return res.status(500).json({ msgs: [err] });

    if (result) {
      return res.status(200).json({
        msg: "Success",
        _id: result._id,
        userId: result.userId,
        filename: result.filename,
        filesize: result.filesize,
        description: result.description,
        name: result.name,
        topic: result.topic,
        dateCreate: result.dateCreate,
        dateModifiedString: result.dateModifiedString
      });
    }
  });
});

//return the file given the file id
router.get("/:docId", (req, res, next) => {
  const docId = req.params.docId;
  Docu.findById(docId).exec(function (err, result) {
    if (err) return res.status(500).json({ msgs: ["Server Error"] });
    if (!result) return res.status(404).json({ msgs: ["There is no document with that id "] });
    let filename = result._id+ "_" + result.filename

    if (!fs.existsSync(__dirname+ '/uploads/'+filename)) {
      fs.writeFileSync(__dirname+ '/uploads/'+filename, result.file)
    }
    return res.sendFile("./uploads/"+filename, { root: __dirname });
    

});
});

// return meta data for all files for a specified user
router.get("/user/:id",isAuthenticated,isAuthorized, [
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
 
 // find all files for user, exclude the file data from the result
 Docu.find(query, { file: 0}).sort({dateCreate: -1}).exec(function (err, result) {
   if (err) return res.status(500).json({ msgs: ["Server Error"] });
   if (!result) return res.status(404).json({ msgs: ["Invalid user or topic"] });

   return res.status(200).json({
     msg: "Success",
     docs: result
   });
 });
});

// update and delete


module.exports = router;

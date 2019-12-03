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

router.post("/upload", function(req, res) {

  var newDoc = new Docu({ file: req.files.doc.data });

  newDoc.save(function(err, result) {
    if (err) return res.status(500).json({ msgs: [err] });
    if (result) {
      return res.status(200).json({
        msg: "Success"
      });
    }
  });
});

router.get("/:docId", (req, res, next) => {
  const docId = req.params.docId;
  Docu.findById(docId).exec(function (err, result) {
    if (err) return res.status(500).json({ msgs: ["Server Error"] });
    if (!result) return res.status(404).json({ msgs: ["There is no document with that id for this user"] });
    //res.contentType = "application/msword"; 
    fs.writeFileSync(__dirname+ '/uploads/some.doc', result.file)
    return res.sendFile("./uploads/some.doc", { root: __dirname });
    

});
});


module.exports = router;

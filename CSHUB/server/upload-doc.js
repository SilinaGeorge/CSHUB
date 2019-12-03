const multer = require('multer');
const path   = require('path');
/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: './routes/uploads',
  filename: function(req, file, fn){
    fn(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
  }
}); 
//init
const upload =  multer({
  storage: storageEngine,
  limits: { fileSize:200000 },
  fileFilter: function(req, file, callback){
    validateFile(file, callback);
  }
}).single('doc');
var validateFile = function(file, cb ){
  //allowedFileTypes = /.doc|.docx|.pdf|.xls|.xlsx|.ppt|.pptx|.txt/;
  allowedFileTypes = /doc|pdf|application\/msword|gif/;;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  //console.log(extension)
  const mimeType  = allowedFileTypes.test(file.mimetype);
  //console.log(file.mimetype)
  if(extension && mimeType){
    return cb(null, true);
  }else{
    cb("Invalid file type. Only pdf, doc(x), xls(x), ppt(x) and txt file are allowed.")
  }
}
module.exports = upload;
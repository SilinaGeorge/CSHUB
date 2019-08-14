const mongoose = require("mongoose");

// create the collection for Users
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id:{ type:String, max:50 } , //email
  firstname: { type:String, max:50 },
  lastname: { type:String, max:50 },
  salt: String,
  hash: String,

});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
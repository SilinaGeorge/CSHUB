const mongoose = require("mongoose");

// create the collection for Users
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id:{ type:String, max:50, required: true } , //email
  firstname: { type:String, max:50, required: true },
  lastname: { type:String, max:50, required: true },
  spotifyurl: { type:String, max:90, required: false},
  salt: {type:String, required: true},
  hash: {type:String, required: true},

});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
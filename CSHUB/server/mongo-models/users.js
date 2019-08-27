const mongoose = require("mongoose");

// create the collection for Users
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, max: 50, required: true },
  firstname: { type: String, max: 50, required: true },
  lastname: { type: String, max: 50, required: true },
  salt: { type: String, required: false },
  hash: { type: String, required: false },
  local: { type: Boolean, required: true },
  facebook: { type: Boolean, required: true },
  facebook_id: { type: String, required: false},
  google: { type: Boolean, required: true },
  google_id: { type: String, required: false},
  accessToken: { type: String, required: false},
  spotifyurl: { type: String, max: 90},
  notifications: { type: Object, required: false}

});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
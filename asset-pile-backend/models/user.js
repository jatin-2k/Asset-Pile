const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  assets: {
    type: Array,
    default: ["BTC", "USD", "DOGE"],
  },
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);
module.exports = User;

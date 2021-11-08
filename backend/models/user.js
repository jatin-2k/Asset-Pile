var mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  //userschema
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const { v4: uuidv4 } = require("uuid");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    assets: {
      type: Array,
      default: ["BTC", "USD", "DOGE"],
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) == this.encry_password;
  },
  securePassword: function (plainPassword) {
    if (!plainPassword) return " ";

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);

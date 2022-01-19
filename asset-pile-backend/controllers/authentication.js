const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      params: errors.array()[0].param,
    });
  }
  const user = new User(req.body);
  // console.log(user);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB..",
        error: err,
      });
    } else {
      res.json({
        name: user.name,
        // email: user.email,
        id: user._id,
      });
    }
  });
};

exports.signin = (req, res) => {
  const { name, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      params: errors.array()[0].param,
    });
  }
  User.findOne({ name }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User does not exist ",
      });
    }
    if (!user.authenticate(password)) {
      res.status(401).json({
        error: "Password and Username does not match",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    res.cookie("token", token, { expire: new Date() + 3600 });

    const { _id, name } = user;
    return res.json({ token, user: { _id, name } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.json({
    message: "User signedout",
  });
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  requestProperty: "auth",
  algorithms: ["HS256"],
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Authentication failed access denied",
    });
  }
  next();
};

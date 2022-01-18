const User = require("../models/user");
var passport = require("passport");
var authenticate = require("../controllers/authentication");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in the DB",
      });
    }

    req.profile = user;
    next();
  });
};

exports.signup = (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        passport.authenticate("local")(req, res, () => {
          // console.log("DOONE");
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: true,
            status: "Registration Successful!",
          });
        });
      }
    }
  );
};

exports.login = (req, res) => {
  // console.log(req.user.username);
  const { username } = req.user._id;
  User.findById(username).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        msg: "User does not exist..",
        error: err,
      });
    }
    const token = authenticate.getToken({ _id: req.user._id });
    res.cookie("token", token, { expire: new Date() + 9999 });

    const { _id, username } = user;
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.json({ token, user: { _id, username } });
  });
};

exports.logout = (req, res) => {
  // console.log(req.session);
};

exports.userAssetList = (req, res) => {
  res.json(req.profile.assets);
};

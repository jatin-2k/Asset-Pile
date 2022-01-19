const User = require("../models/user");

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

exports.userAssetList = (req, res) => {
  res.json(req.profile.assets);
};

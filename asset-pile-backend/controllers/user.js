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

exports.addUserAssets = (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $push: { assets: req.body.asset } },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to add the asset",
        });
      }
      res.json({
        user: user,
      });
      next();
    }
  );
};

exports.userAssetList = (req, res) => {
  res.json(req.profile.assets);
};

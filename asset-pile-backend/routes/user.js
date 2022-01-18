var express = require("express");
var userRouter = express.Router();
var passport = require("passport");
var authenticate = require("../controllers/authentication");
const {
  signup,
  login,
  logout,
  userAssetList,
  getUserById,
} = require("../controllers/user");

userRouter.use(express.json());

userRouter.get("/", (req, res) => {
  res.send("respond with a resource");
});

userRouter.param("userId", getUserById);

userRouter.post("/signup", signup);

userRouter.post("/login", passport.authenticate("local"), login);

userRouter.get("/logout", logout);

userRouter.get("/test/:userId", userAssetList);

userRouter.get("/assets/:userId", authenticate.verifyUser, userAssetList);

// userRouter.post("/addassets/:userId");
module.exports = userRouter;

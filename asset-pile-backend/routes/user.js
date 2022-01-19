var express = require("express");
var router = express.Router();
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/authentication");
const {
  userAssetList,
  getUserById,
  addUserAssets,
} = require("../controllers/user");

router.use(express.json());

router.get("/", (req, res) => {
  res.send("respond with a resource");
});

router.param("userId", getUserById);

router.get("/test/:userId", userAssetList);

router.post(
  "/user/addasset/:userId",
  isSignedIn,
  isAuthenticated,
  addUserAssets
);

router.get("/user/assets/:userId", isSignedIn, isAuthenticated, userAssetList);

// router.post("/addassets/:userId");
module.exports = router;

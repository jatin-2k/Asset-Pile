var express = require("express");
const { check } = require("express-validator");
const {
  signup,
  signin,
  isSignedIn,
  signout,
} = require("../controllers/authentication");
var router = express.Router();

router.post(
  "/signup",
  check("name").isLength({ min: 3 }).withMessage("must be minimum 3 charas"),
  check("password")
    .isLength({ min: 3 })
    .withMessage("Password should be 3 characters"),
  signup
);

router.post(
  "/signin",
  check("name").isLength({ min: 3 }).withMessage("must be minimum 3 charas"),
  check("password")
    .isLength({ min: 1 })
    .withMessage("Password feild is required"),
  signin
);

router.get("/signout", signout);

router.get("/test", isSignedIn, (req, res) => {
  console.log(user);
  res.json(req.auth);
});
module.exports = router;

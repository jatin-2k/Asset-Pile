var express = require('express');
var router = express.Router();
var authenticate = require('../controllers/authentication');

/* GET home page. */
router.route('/')
.get(authenticate.verifyUser ,(req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;

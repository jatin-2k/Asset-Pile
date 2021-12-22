var express = require('express');
var mongoose = require('mongoose');
var userRouter = express.Router();
var Users = require('../models/user-model');
var passport = require('passport');
var authenticate = require('../controllers/authentication');

userRouter.use(express.json());

userRouter.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

userRouter.post('/signup', (req, res, next) => {
    Users.register(new Users({username: req.body.username}), 
        req.body.password, (err, user) => {
        if(err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
        }
        else {
            passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Successful!'});
        });
        }
    });
});
  
userRouter.post('/login', passport.authenticate('local'), (req, res) => {

    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
  });
  
userRouter.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
});

module.exports = userRouter;

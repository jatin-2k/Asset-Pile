var express = require('express');
var userRouter = express.Router();

dishRouter.use(express.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the Users to you!');
})
.post((req, res, next) => {
    res.end('Will add the user: ' + req.body.name);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /users');
})
.delete((req, res, next) => {
    res.end('Deleting all users');
});

module.exports = userRouter;

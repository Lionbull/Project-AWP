var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const validateToken = require('../auth/validateToken');
const Post = require('../models/Posts');

/* GET home page. */
router.get('/listposts', function(req, res, next) {
  // Get list of posts from database
  Post.find({}, (err, posts) =>{
    if(err) return next(err);
    res.json(posts);
  })
});

router.post('/createpost', validateToken, function(req, res, next) {
  // Create a new post in the database
  new Post({
    email: req.user.email,
    title: req.body.title,
    body: req.body.body
  }).save((err) => {
    if (err) return next(err)
    console.log(req.body)
    return res.status(200);
  })
})

module.exports = router;
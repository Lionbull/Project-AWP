var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const validateToken = require('../auth/validateToken');
const Post = require('../models/Posts');
const Comment = require('../models/Comments');

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

router.post('/getonepost', function(req, res, next) {
  let post_id = req.body.post_id;
  console.log(post_id)
  Post.find({_id: post_id}, (err, post) =>{
    if(err) return next(err);
    res.json(post);
  })
})

router.post('/listcomments', function(req, res, next) {
  Comment.find({commented_post_id: req.body.post_id}, (err, comments) =>{
    if(err) return next(err);
    res.json(comments);
  })
})

router.post('/createcomment', validateToken, function(req, res, next) {
  // Create a new comment in the database
  new Comment({
    commented_post_id: req.body.post_id,
    email: req.user.email,
    body: req.body.body
  }).save((err) => {
    if (err) return next(err)
    console.log(req.body)
    return res.status(200);
  })
})

module.exports = router;
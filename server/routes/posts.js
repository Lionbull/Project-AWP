var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const validateToken = require('../auth/validateToken');
const Post = require('../models/Posts');
const Comment = require('../models/Comments');

// Route to get all posts from the database
router.get('/listposts', function(req, res, next) {
  Post.find({}, (err, posts) =>{
    if(err) return next(err);
    res.json(posts);
  })
});

// Route to create a post in the database
router.post('/createpost', validateToken, function(req, res, next) {
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

// Route to get a single post by id
router.post('/getonepost', function(req, res, next) {
  let post_id = req.body.post_id;
  console.log(post_id)
  Post.find({_id: post_id}, (err, post) =>{
    if(err) return next(err);
    res.json(post);
  })
})

// Route to get all comments for a single post
router.post('/listcomments', function(req, res, next) {
  Comment.find({commented_post_id: req.body.post_id}, (err, comments) =>{
    if(err) return next(err);
    res.json(comments);
  })
})

// Route to create a comment on a post in the database
router.post('/createcomment', validateToken, function(req, res, next) {
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
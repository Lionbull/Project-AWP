var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const validateToken = require('../auth/validateToken');
const Post = require('../models/Posts');
const Comment = require('../models/Comments');
const Votes = require('../models/Votes');

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

// Route to get all votes for a single post
// This route is called every time a user clicks the upvote or downvote button and page with any post is loaded
router.post('/getvotes', function(req, res, next) {
  let votes_total = 0;

  // Search for all votes for a single post
  Votes.find({post_id: req.body.post_id}, (err, votes) =>{
    if(err) return next(err);
    for(let i = 0; i < votes.length; i++) {

      // Calculate the total value of all votes for a single post
      votes_total += votes[i].vote;
    }
    console.log(votes_total)
    res.json(votes_total);
  })
})

// Route to create a vote on a post in the database
// The vote is either 1 (upvote) or -1 (downvote)
router.post('/submitvote', validateToken, function(req, res, next) {

  // Check if the user has already voted on this post
  Votes.findOne({user_email: req.user.email, post_id: req.body.post_id}, (err, vote) => {
    if(err) return next(err);

    // If the user has already voted on this post with a same vote, delete the vote
    if(vote){
      if(vote.vote === req.body.vote) {
        Votes.deleteOne({user_email: req.user.email, post_id: req.body.post_id}, (err) => {
          if (err) return next(err)
          console.log(req.body)
          return res.status(200);
        })}

        // If the user has already voted on this post, but with a different vote, delete old vote and create a new vote
        else if(vote.vote !== req.body.vote) {
          Votes.deleteOne({user_email: req.user.email, post_id: req.body.post_id}, (err) => {
            if (err) return next(err)
          })
          new Votes({
            vote: req.body.vote,
            post_id: req.body.post_id,
            user_email: req.user.email
          }).save((err) => {
            if (err) return next(err)
            console.log(req.body)
            return res.status(200);
          })

        }
    }

      // If the user has not voted on this post, create a new vote
      else {
        new Votes({
          vote: req.body.vote,
          post_id: req.body.post_id,
          user_email: req.user.email
        }).save((err) => {
          if (err) return next(err)
          console.log(req.body)
          return res.status(200);
        })
      }
    })
})


module.exports = router;
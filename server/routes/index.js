var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Book = require('../models/Books');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/book', function(req, res, next) {
  new Book({
    name: req.body.name,
    author: req.body.author,
    pages: req.body.pages
  }).save((err) => {
    if (err) return next(err)
    console.log(req.body)
    return res.send(req.body);
  })
});

router.get("/book/:bookName", function(req, res, next) {
  Book.findOne({name: req.params.bookName}, (err, book) => {
    if (err) return next(err)
    return res.send(book);
  })
});


module.exports = router;

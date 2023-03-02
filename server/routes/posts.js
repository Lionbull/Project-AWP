var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

/* GET home page. */
router.get('/getposts', function(req, res, next) {
  console.log("getposts");
});

module.exports = router;
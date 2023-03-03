var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js")

// Login route to get a token
router.post('/login', 
  body("email"),
  body("password"),
  (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) =>{
    if(err) throw err;
    if(!user) {

      // If the user is not found, return a 403 error
      return res.status(403).json({message: "Login failed. Email not found."});
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          const jwtPayload = {
            id: user._id,
            email: user.email
          }
          jwt.sign(
            jwtPayload,
            // Using the secret from the environment variable (.env file)
            process.env.SECRET,
            {
              expiresIn: 120
            },
            (err, token) => {
              res.json({success: true, token});
            }
          );
        }
      })
    }
    })
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

// Register route to create a new user
router.post('/register', 
  body("email").isLength({min: 3}),
  body("password").isLength({min: 5}),
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    User.findOne({email: req.body.email}, (err, user) => {
      if(err) {
        console.log(err);
        throw err
      };
      if(user){

        // If a user with same email is found, return a 403 error
        return res.status(403).json({message: "Email already in use."});
      } else {
        bcrypt.genSalt(10, (err, salt) => {

          // Hash the password before saving it to the database
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            User.create(
              {
                email: req.body.email,
                password: hash
              },
              (err, ok) => {
                if(err) throw err;
                return res.status(200).json({message: "Registration successful!"});
              }
            );
          });
        });
      }
    });
});

module.exports = router;
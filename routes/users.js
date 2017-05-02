const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/database')

const User = require('../models/user');

router.post('/register', (req, res, next) => {
  let user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  User.addUser(user, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register user.'})
    } else {
      res.json({success: true, msg: 'User has been registered.'})
    }
  });
});

router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: "JWT " + token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            admin: user.admin
          }
        });
      } else {
        return res.json({success: false, msg: 'Incorrect password.'});
      }
    })
  })
});

router.post('/verifylogin', (req, res, next) => {
  const id = req.body.id;

  User.getUserById(id, (err, user) => {
    if(err) return res.json({success: false, msg: 'An error has occurred.'});
    if(user) {
      return res.json({success: true, user: user});
    } else {
      return res.json({success: false, msg: 'Invalid session. Please log in.'});
    }
  });
});

router.get('/allowregistration', (req, res, next) => {
  User.getUserCount((err, count) => {
    if(count == 0) {
      return res.json({success: true});
    } else {
      return res.json({success: false});
    }
  })
})

module.exports = router;

const express = require('express');
const router = express.Router();

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

router.get('/authenticate', (req, res, next) => {
  res.send('AUTHENTICATE ROUTE');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Post = require('../models/post');

//protected route
router.post('/new', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  let post = new Post({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
    url: req.body.url
  });

  Post.addPost(post, (err, post) => {
    if(err) {
      res.json({success: false, msg: 'Failed to add post.'});
    } else {
      res.json({success: true, msg: 'Post added successfully.'});
    }
  });
});

router.get('/recent', (req, res, next) => {
  Post.getRecentPosts((err, posts) => {
    if(posts) {
      res.json({
        success: true,
        posts: posts
      })
    } else {
      res.json({success: false, msg:'Could not get recent posts.'});
    }
  });
});

router.get('/:post_url', (req, res, next) => {
  const url = req.params.post_url;

  Post.getPostByUrl(url, (err, post) => {
    if(post) {
      res.json({
        success: true,
        post: post
      });
    } else {
      res.json({success: false, msg:'Post not found.'});
    }
  });
});

module.exports = router;

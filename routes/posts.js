const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.post('/new', (req, res, next) => {
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
      res.json({success: true, msg: 'Post added successfuly.'});
    }
  });
});

router.post('/:post_url', (req, res, next) => {
  const url = req.params.post_url;

  Post.getPostByUrl(url, (err, post) => {
    if(post) {
      res.json(post);
    } else {
      res.json({success: false, msg:'Post not found.'});
    }
  });
});

router.get('/recent', (req, res, next) => {
  res.send('RECENT POSTS');
})

module.exports = router;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Create post schema
const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  url: {
    type: String,
    required: true
  }
});

const Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.getPostByUrl = function(url, callback) {
  const query = {url: url};
  Post.findOne(query, callback);
}

module.exports.addPost = function(post, callback) {
  post.save(callback);
}

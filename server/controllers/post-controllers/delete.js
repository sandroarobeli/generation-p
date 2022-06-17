const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Post = require("../../models/post");

// Delete post
const deletePost = async (req, res, next) => {
  const id = req.params.id;
  try {
    let deletedPost = await Post.findById(id);
    if (req.userData.userId === deletedPost.userId) {
      deletedPost = await Post.findByIdAndDelete(id);
      res.status(200).json({ post: deletedPost });
    } else {
      res
        .status(403)
        .json({ message: "You are not authorized to delete this post!" });
    }
  } catch (error) {
    res.status(500).json({ message: `Deletion failed: ${error.message}` });
  }
};

module.exports = deletePost;

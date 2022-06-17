const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Post = require("../../models/post");

// Update post
const update = async (req, res, next) => {
  const id = req.params.id;
  try {
    let updatedPost = await Post.findById(id);
    if (req.userData.userId === updatedPost.userId) {
      updatedPost = await Post.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({ post: updatedPost });
    } else {
      res
        .status(403)
        .json({ message: "You are not authorized to update this post!" });
    }
  } catch (error) {
    res.status(500).json({ message: `Update failed: ${error.message}` });
  }
};

module.exports = update;

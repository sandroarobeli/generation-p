const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Post = require("../../models/post");

// Retrieve post
const retrieve = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.status(200).json({ post: post });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to fetch the post ${error.message}` });
  }
};

module.exports = retrieve;

const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Post = require("../../models/post");

// Create post
const create = async (req, res, next) => {
  // Middleware registered in the routes gets invoked here
  // If returned errors object isn't empty, error is passed down the chain via next()
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error("Invalid inputs entered. Please check your data")); // 422
  }
  // Getting manually entered properties from the user request
  const { description } = req.body;

  try {
    const newPost = new Post({
      userId: req.userData.userId,
      description,
    });
    await newPost.save();
    res.status(201).json({ post: newPost });
  } catch (error) {
    res.status(500).json({ message: `Creating post failed: ${error.message}` });
  }
};

module.exports = create;

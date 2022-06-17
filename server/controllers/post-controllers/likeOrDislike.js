const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Post = require("../../models/post");

// Like or Dislike post
const likeOrDislike = async (req, res, next) => {
  const id = req.params.id;
  try {
    const postToLikeOrDislike = await Post.findById(id);

    if (!postToLikeOrDislike.likes.includes(req.userData.userId)) {
      await postToLikeOrDislike.updateOne({
        $push: { likes: req.userData.userId },
      });
    } else {
      await postToLikeOrDislike.updateOne({
        $pull: { likes: req.userData.userId },
      });
    }
    res.status(200).json({ post: postToLikeOrDislike });
  } catch (error) {
    res.status(500).json({ message: `Liking failed: ${error.message}` });
  }
};

module.exports = likeOrDislike;

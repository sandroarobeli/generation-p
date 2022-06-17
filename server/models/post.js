const mongoose = require("mongoose");

// Define Post Schema
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Define Post class per its Schema (Blueprint)
const Post = mongoose.model("Post", postSchema);

module.exports = Post;

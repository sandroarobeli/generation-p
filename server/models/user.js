const mongoose = require("mongoose");

// Define User Schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      maxlength: 50,
    },
    location: {
      type: String,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  {
    timestamps: true,
  }
);

// Define User class per its Schema (Blueprint)
const User = mongoose.model("User", userSchema);

module.exports = User;

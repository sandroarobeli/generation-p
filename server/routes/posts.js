const express = require("express");
const { check } = require("express-validator");

const checkAuthentication = require("../middleware/authentication");
const create = require("../controllers/post-controllers/create");
const timeline = require("../controllers/post-controllers/timeline");
const retrieve = require("../controllers/post-controllers/retrieve");
const update = require("../controllers/post-controllers/update");
const likeOrDislike = require("../controllers/post-controllers/likeOrDislike");
const deletePost = require("../controllers/post-controllers/delete");

// Initializing the router object
const router = express.Router();

// Create post
router.post(
  "/",
  checkAuthentication,
  [check("description").isLength({ max: 500 })],
  create
);

// Retrieve all post by user
router.get("/", checkAuthentication, timeline);

// Retrieve post
router.get("/:id", retrieve);

// Update post
router.patch("/:id", checkAuthentication, update);

// Like or Dislike post
router.patch("/likeOrDislike/:id", checkAuthentication, likeOrDislike);

// Delete post
router.delete("/:id", checkAuthentication, deletePost);

module.exports = router;

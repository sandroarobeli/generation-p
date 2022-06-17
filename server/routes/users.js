const express = require("express");
const { check } = require("express-validator");

const checkAuthentication = require("../middleware/authentication");
const register = require("../controllers/user-controllers/register");
const login = require("../controllers/user-controllers/login");
const retrieve = require("../controllers/user-controllers/retrieve");
const follow = require("../controllers/user-controllers/follow");
const unfollow = require("../controllers/user-controllers/unfollow");
const update = require("../controllers/user-controllers/update");
const deleteUser = require("../controllers/user-controllers/delete");

// Initializing the router object
const router = express.Router();

// Register user
router.post(
  "/register",
  [
    check("userName").not().isEmpty().trim().escape(),
    check("email").not().isEmpty().isEmail().escape(),
    check("password").isLength({ min: 6 }),
  ],
  register
);

// Login user
router.post(
  "/login",
  [
    check("email").not().isEmpty().isEmail().escape(),
    check("password").isLength({ min: 6 }),
  ],
  login
);

// Retrieve user
router.get("/:id", retrieve);

// Follow user
router.patch("/follow/:id", checkAuthentication, follow);

// Unfollow user
router.patch("/unfollow/:id", checkAuthentication, unfollow);

// Update user
router.patch("/:id", checkAuthentication, update);

// Delete user
router.delete("/:id", checkAuthentication, deleteUser);

module.exports = router;

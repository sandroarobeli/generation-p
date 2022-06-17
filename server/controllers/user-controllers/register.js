const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../models/user");

// Register user
const register = async (req, res, next) => {
  // Middleware registered in the routes gets invoked here
  // If returned errors object isn't empty, error is passed down the chain via next()
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error("Invalid inputs entered. Please check your data")); // 422
  }

  // Getting manually entered properties from the user request
  const {
    userName,
    email,
    password,
    profilePicture,
    coverPicture,
    following,
    followers,
    isAdmin,
    description,
    location,
    relationship,
  } = req.body;

  // Check if entered email already exists to prevent duplication
  try {
    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      return next(
        new Error(
          "This Username already exists. Please choose another Username"
        )
      ); // 422
    }
  } catch (error) {
    return next(new Error(`Signup failed: ${error.message}`)); // 500
  }

  // Hashing plain text password before saving it in DB
  let hashedPassword; // second argument is number of cascades used to encrypt it
  try {
    hashedPassword = await bcrypt.hash(password, 8);
  } catch (error) {
    return next(new Error("Creating User failed. Please try again"));
  }

  // combining all of above to create a new user
  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
    profilePicture,
    coverPicture,
    following,
    followers,
    isAdmin,
    description,
    location,
    relationship,
  });

  try {
    await newUser.save();

    // Create token, so we can send it back as proof of authorization.
    // We get to decide what data we encode. This time it's userId
    // This way, frontend will attach this token to the requests going to routes that
    // REQUIRE AUTHORIZATION
    let token;
    try {
      // UserId: newUser._id is encoded into token using unique secret key
      token = jwt.sign({ userId: newUser._id }, process.env.SECRET_TOKEN_KEY, {
        expiresIn: "1h",
      });
    } catch (error) {
      return next(new Error("Creating User failed. Please try again")); // 500
    }

    // Sending back whatever data we want with created token
    // res.status(201).json({ user: createdUser })
    /*
    res.status(201).json({
      user: {
        userName: createdUser.userName,
        userId: createdUser._id,
        userAvatar: createdUser.userAvatar,
        posts: createdUser.posts,
        token: token,
        // Sets time to 10 Seconds for TESTING
        // expiration: new Date().getTime() + 1000 * 10,
        // Sets time to 1 Hour for THIS application
        expiration: new Date().getTime() + 1000 * 60 * 60,
      },
    });
    */
    res.status(201).json({
      user: {
        userName: newUser.userName,
        email: newUser.email,
        password: newUser.password,
        profilePicture: newUser.profilePicture,
        coverPicture: newUser.coverPicture,
        following: newUser.following,
        followers: newUser.followers,
        isAdmin: newUser.isAdmin,
        description: newUser.description,
        location: newUser.location,
        relationship: newUser.relationship,
        token: token,
        expiration: new Date().getTime() + 1000 * 60 * 60,
      },
    });

    //res.status(201).json({ user: newUser });
  } catch (error) {
    return next(new Error(`Creating User failed: ${error.message}`)); // 500
  }
};

module.exports = register;

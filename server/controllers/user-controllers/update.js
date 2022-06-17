const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../../models/user");

// MAIN QUESTION: WHY AM I MESSING WITH THIS HORSESHIT???
// I HAVE VERY WELL FUNCTIONING API WITH NEWS-FEED...
// WRITE A NEW DESIGN FRONT, ADD NEWS-FEED API AND FINALLY ADD SOCKET.
// CHANGE THE API TO REFLECT NEW MODELS...
// THIS IS ONE OF THE OPTIONS IF ALL ELSE FAILS...

// EXTRACT UPDATE PASSWORD INTO SEPARATE ROUTE/CONTROLLER

// Update user
const update = async (req, res, next) => {
  if (req.userData.userId === req.params.id || req.body.isAdmin) {
    // || req.user.isAdmin RESTORE IF NEEDED
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.userData.userId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      return next(new Error(`Update failed: ${error.message}`));
    }
  } else {
    return next(new Error("Authorization Denied!"));
    // res.status(403).json({ message: "Not authorized!" }); // TRY THIS INSTEAD OF ERRORs, TEST IT!
  }
};

module.exports = update;

const User = require("../../models/user");

// Retrieve a user
const retrieve = async (req, res, next) => {
  const id = req.params.id;
  try {
    const currentUser = await User.findById(id);
    if (!currentUser) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: currentUser });
  } catch (error) {
    return next(new Error(`Retrieving User failed: ${error.message}`));
  }
};

module.exports = retrieve;

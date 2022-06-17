const User = require("../../models/user");

// Delete user
const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  let deletedUser;
  try {
    deletedUser = await User.findById(id);

    if (!deletedUser) {
      return next(new Error(`User could not be found`));
    }

    // Once found, we make sure (here, on backend) that ONLY whomever created This
    // User MAY delete it as well!
    if (deletedUser._id.toString() !== req.userData.userId) {
      return next(new Error("You are not authorized to delete this user!"));
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ user: deletedUser });
  } catch (error) {
    return next(new Error(`Deleting User failed: ${error.message}`));
  }
};

module.exports = deleteUser;

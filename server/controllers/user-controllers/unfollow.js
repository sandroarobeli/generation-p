const User = require("../../models/user");

const unfollow = async (req, res, next) => {
  const id = req.params.id;
  if (req.userData.userId !== id) {
    try {
      let userToUnfollow = await User.findById(id);
      let currentUser = await User.findById(req.userData.userId);
      if (userToUnfollow.followers.includes(req.userData.userId)) {
        // Remove from followers
        await userToUnfollow.updateOne({
          $pull: { followers: req.userData.userId },
        });
        // Remove from following
        await currentUser.updateOne({ $pull: { following: id } });
        res.status(200).json({
          message: `You are no longer following ${userToUnfollow.userName}`,
        });
      } else {
        return next(new Error("You do not follow this user"));
      }
    } catch (error) {
      return next(new Error("Unfollowing failed, please try again later"));
    }
  } else {
    res.status(401).json({ message: "You cant unfollow yourself" });
  }
};

module.exports = unfollow;

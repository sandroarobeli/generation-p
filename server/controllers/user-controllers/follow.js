const User = require("../../models/user");

const follow = async (req, res, next) => {
  const id = req.params.id;
  if (req.userData.userId !== id) {
    try {
      const userToFollow = await User.findById(id);
      const currentUser = await User.findById(req.userData.userId);
      if (!userToFollow.followers.includes(req.userData.userId)) {
        // Add to followers
        await userToFollow.updateOne({
          $push: { followers: req.userData.userId },
        });
        // Add to following
        await currentUser.updateOne({ $push: { following: id } });

        res
          .status(200)
          .json({ message: `You are now following ${userToFollow.userName}` });
      } else {
        return next(new Error("You already follow this user"));
      }
    } catch (error) {
      return next(new Error("Following failed, please try again later"));
    }
  } else {
    res.status(401).json({ message: "You cant follow yourself" });
  }
};

module.exports = follow;

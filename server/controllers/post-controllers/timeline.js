const Post = require("../../models/post");
const User = require("../../models/user");

// Retrieve all post by user
const timeline = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.userData.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => Post.find({ userId: friendId }))
    );
    res.status(200).json({ posts: userPosts.concat(...friendPosts) });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to retrieve timeline ${error.message}` });
  }
};

module.exports = timeline;

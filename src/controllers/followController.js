const { Follower } = require("../../models");

const followed = async (req, res) => {
  try {
    const { followerId } = req.body;
    const { id } = req.user;
    console.log(followerId, id);

    if (followerId == id) {
      return res.status(400).json({
        status: "Error",
        message: "Cannot Follow User Account",
      });
    }

    const findFollower = await Follower.findOne({
      where: {
        followedId: id,
        followerId,
      },
    });

    if (findFollower) {
      return res.status(400).json({
        status: "Error",
        message: "User already followed",
      });
    }

    const addFollower = await Follower.create({
      followedId: id,
      followerId,
    });

    res.status(200).json({
      status: "Success",
      message: "Follower successfully updated",
      data: { Follower: addFollower },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const unfollowed = async (req, res) => {
  try {
    const { followerId } = req.body;
    const { id } = req.user;

    if (followerId === id) {
      return res.status(400).json({
        status: "Error",
        message: "Cannot Follow User Account",
      });
    }
    const findFollower = await Follower.findOne({
      where: {
        followedId: id,
        followerId,
      },
    });

    if (!findFollower) {
      return res.status(400).json({
        status: "Error",
        message: "Follower not Found",
      });
    }

    const removeFollower = await Follower.destroy({
      where: { followerId, followedId: id },
    });

    res.status(200).json({
      status: "Success",
      message: "Follower successfully destroy",
      data: { Follower: removeFollower },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

module.exports = {
  followed,
  unfollowed,
};

const { Follower } = require("../../models");

const followed = async (req, res) => {
  try {
    const { followerId } = req.body;
    const { id } = req.user;

    const addFollower = await Follower.create({
      userId: id,
      followerId,
    });

    res.status(201).json({
      status: "Success",
      message: "Follower successfully created",
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

    const addFollower = await Follower.destroy({
      where: { followerId, userId: id },
    });

    res.status(201).json({
      status: "Success",
      message: "Follower successfully created",
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

module.exports = {
  followed,
  unfollowed,
};

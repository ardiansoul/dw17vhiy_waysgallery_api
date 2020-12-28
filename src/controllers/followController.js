const { Follower } = require("../../models");

const followed = async (req, res) => {
  try {
    const { followerId, value } = req.body;
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
        userId: id,
        followerId,
      },
    });

    if (!findFollower) {
      await Follower.create({
        userId: id,
        followerId,
      });
    }

    // await Follower.findOrCreate({
    //   where: {
    //     userId: id,
    //     followerId,
    //   },
    // });

    const updateFollower = await Follower.update(
      { value: value },
      {
        where: {
          userId: id,
          followerId,
        },
        returning: true,
        plain: true,
      }
    );

    console.log(updateFollower);
    res.status(200).json({
      status: "Success",
      message: "Follower successfully updated",
      data: { Follower: updateFollower[1] },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

// const unfollowed = async (req, res) => {
//   try {
//     const { followerId } = req.body;
//     const { id } = req.user;

//     console.log(followerId, id);
//     if (followerId === id) {
//       return res.status(400).json({
//         status: "Error",
//         message: "Cannot Follow User Account",
//       });
//     }
//     const findFollower = await Follower.findOne({
//       where: {
//         userId: id,
//         followerId,
//       },
//     });

//     if (!findFollower) {
//       return res.status(400).json({
//         status: "Error",
//         message: "Follower not Found",
//       });
//     }

//     const removeFollower = await Follower.update({status} ,{
//       where: { followerId, userId: id },
//     });

//     res.status(200).json({
//       status: "Success",
//       message: "Follower successfully destroy",
//       data: { Follower: removeFollower },
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       status: "Error",
//       message: err.message,
//     });
//   }
// };

module.exports = {
  followed,
};

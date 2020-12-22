const { User, Post, postPhoto, Art } = require("../../models");

const getUser = async (req, res) => {
  try {
    const { id } = req.user;

    const getUser = await User.findOne({
      where: {
        id,
      },
      order: [[{ model: Post, as: "posts" }, "createdAt", "DESC"]],
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: Post,
          as: "posts",
          attributes: {
            exclude: ["userId", "createdAt", "updatedAt"],
          },

          include: [
            {
              model: postPhoto,
              as: "photos",
              attributes: {
                exclude: ["postId", "projectId", "createdAt", "updatedAt"],
              },
            },
          ],
        },
        {
          model: Art,
          as: "arts",
          attributes: {
            exclude: ["createdById", "createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.status(201).json({
      status: "Success",
      message: "User successfully loaded",
      data: getUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const getUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: Post,
          as: "posts",
          attributes: {
            exclude: ["userId", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: postPhoto,
              as: "photos",
              attributes: {
                exclude: ["postId", "projectId", "createdAt", "updatedAt"],
              },
            },
          ],
        },
        {
          model: Art,
          as: "arts",
          attributes: {
            exclude: ["createdById", "createdAt", "updatedAt"],
          },
        },
      ],
    });
    res.status(201).json({
      status: "Success",
      message: "User successfully loaded",
      data: getUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    if (req.file) req.body.avatar = req.file.path;

    const getUser = await User.findOne({
      where: {
        id,
      },
    });

    if (!getUser) {
      return res.status(400).json({
        status: "Error",
        message: "User not Found",
      });
    }

    await User.update(req.body, {
      where: { id },
    });

    const getUserAfterUpdate = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: Post,
          as: "posts",
          attributes: {
            exclude: ["userId", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: postPhoto,
              as: "photos",
              attributes: {
                exclude: ["postId", "projectId", "createdAt", "updatedAt"],
              },
            },
          ],
        },
        {
          model: Art,
          as: "arts",
          attributes: {
            exclude: ["createdById", "createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.status(201).json({
      status: "Success",
      message: "User successfully updated",
      data: getUserAfterUpdate,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const uploadArt = async (req, res) => {
  try {
    const createdById = req.user.id;

    await Promise.all(
      req.files.map(async (file) => {
        await Art.create({
          image: file.path,
          createdById: createdById,
        });
      })
    );

    const getArts = await Art.findAll({
      where: { createdById: createdById },
      attributes: {
        exclude: ["createdById", "createdAt", "updatedAt"],
      },
    });

    res.status(201).json({
      status: "Success",
      message: "Arts successfully created",
      data: { arts: getArts },
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
  getUser,
  getUserById,
  updateUser,
  uploadArt,
};

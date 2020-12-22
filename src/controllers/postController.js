const { Post, postPhoto, User } = require("../../models");
const { postValidation } = require("../middleware/validationForm");

const getPosts = async (req, res) => {
  try {
    const getPost = await Post.findAll({
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: postPhoto,
          as: "photos",
          attributes: {
            exclude: ["projectId", "createdAt", "updatedAt", "postId"],
          },
        },
        {
          model: User,
          as: "createdBy",
          attributes: {
            exclude: ["password", "greating", "createdAt", "updatedAt"],
          },
        },
      ],
    });

    if (!getPost) {
      return res.status(400).json({
        status: "Error",
        message: "Post not Found",
      });
    }

    res.status(201).json({
      status: "Success",
      message: "Posts successfully loaded",
      data: { posts: getPost },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const getPost = await Post.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: postPhoto,
          as: "photos",
          attributes: {
            exclude: ["projectId", "createdAt", "updatedAt", "postId"],
          },
        },
        {
          model: User,
          as: "createdBy",
          attributes: {
            exclude: ["password", "greating", "createdAt", "updatedAt"],
          },
        },
      ],
    });

    if (!getPost) {
      return res.status(400).json({
        status: "Error",
        message: "Post not Found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Post successfully loaded",
      data: { post: getPost },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};
const createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    if (req.files) req.body.photos = req.files;

    const { title, description, photos } = req.body;

    const { error } = postValidation(req.body);

    if (error) {
      return res.status(400).json({
        status: "Error",
        message: error.details[0].message,
      });
    }

    const createPost = await Post.create({ title, description, userId });

    await Promise.all(
      photos.map(async (photo) => {
        await postPhoto.create({
          image: photo.path,
          postId: createPost.id,
        });
      })
    );

    const getPost = await Post.findOne({
      where: {
        id: createPost.id,
      },
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: postPhoto,
          as: "photos",
          attributes: {
            exclude: ["projectId", "createdAt", "updatedAt", "postId"],
          },
        },
        {
          model: User,
          as: "createdBy",
          attributes: {
            exclude: [
              "password",
              "avatar",
              "greating",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
    });

    res.status(201).json({
      status: "Success",
      message: "Post successfully created",
      data: { post: getPost },
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
  getPosts,
  getPost,
  createPost,
};

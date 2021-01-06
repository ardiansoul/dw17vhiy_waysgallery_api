const { Post, postPhoto, User, Follower } = require("../../models");
const { postValidation } = require("../middleware/validationForm");
const { Op } = require("sequelize");

const getPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const { query, type } = req.query;

    if (type === "follow") {
      console.log(type);
      const getPost = await Post.findAll({
        where: req.query.query && {
          title: {
            [Op.like]: "%" + query + "%",
          },
        },
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"],
        },
        order: [["createdAt", "DESC"]],
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
            include: [
              {
                through: {
                  model: Follower,
                  where: {
                    followedId: userId,
                  },
                  attributes: [],
                },
                model: User,
                as: "followed",
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
          },
        ],
      });
      return res.status(200).json({
        status: "Success",
        message: "Posts by id successfully loaded",
        data: { posts: getPost },
      });
    }

    const getPost = await Post.findAll({
      where: req.query.query && {
        title: {
          [Op.like]: "%" + query + "%",
        },
      },
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
      order: [["createdAt", "DESC"]],
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
      message: "Posts successfully loaded",
      data: { posts: getPost },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
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
          include: [
            {
              through: {
                model: Follower,
                where: {
                  followedId: userId,
                },
                attributes: [],
              },
              model: User,
              as: "followed",
              attributes: {
                exclude: [
                  "password",
                  "avatar",
                  "greating",
                  "createdAt",
                  "updatedAt",
                ],
              },
              // include: [
              //   {
              //     model: User,
              //     as: "followed",
              //     where: {
              //       followedId: userId,
              //     },
              //   },
              // ],
              // through: { model: Follower },
              // attributes: {
              //   exclude: ["id", "createdAt", "updatedAt"],
              // },
              // where: {
              //   userId: userId,
              // },
            },
          ],
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
    console.error(err);
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

    console.log(req.body);
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
    console.error(err);
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

const { Transaction, Project, projectPhoto } = require("../../models");
const { projectValidation } = require("../middleware/validationForm");

const createProject = async (req, res) => {
  try {
    if (req.files) req.body.photos = req.files;

    const { description, transactionId, photos } = req.body;

    const { error } = projectValidation(req.body);

    if (error) {
      return res.status(400).json({
        status: "Error",
        message: error.details[0].message,
      });
    }

    const transactionExist = await Transaction.findOne({
      where: { id: transactionId },
    });

    if (!transactionExist) {
      return res.status(400).json({
        status: "Error",
        message: "Transaction not found",
      });
    }

    const createProject = await Project.create({
      description,
      transactionId,
    });

    await Promise.all(
      photos.map(async (file) => {
        await projectPhoto.create({
          image: file.path,
          projectId: createProject.id,
        });
      })
    );

    const getProject = await Project.findOne({
      where: { id: createProject.id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "transactionId"],
      },
      include: [
        {
          model: projectPhoto,
          as: "photos",
          attributes: {
            exclude: ["projectId", "createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.status(201).json({
      status: "Success",
      message: "Project successfully created",
      data: { project: getProject },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;

    const getProject = await Project.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "transactionId"],
      },
      include: [
        {
          model: projectPhoto,
          as: "photos",
          attributes: {
            exclude: ["projectId", "createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.status(200).json({
      status: "Success",
      message: "Project successfully loaded",
      data: { project: getProject },
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

module.exports = {
  createProject,
  getProject,
};

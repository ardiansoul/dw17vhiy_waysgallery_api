const { Transaction, User, Project, projectPhoto } = require("../../models");
const { hiredValidation } = require("../middleware/validationForm");

const order = async (req, res) => {
  try {
    const orderbyId = req.user.id;

    const {
      orderTo: ordertoId,
      title,
      description,
      startDate,
      endDate,
      price,
    } = req.body;

    const { error } = hiredValidation(req.body);

    if (error) {
      return res.status(400).json({
        status: "Error",
        message: error.details[0].message,
      });
    }

    const createOrder = await Transaction.create({
      ordertoId,
      title,
      description,
      startDate,
      endDate,
      price,
      orderbyId,
      status: "Waiting Approve",
    });

    const getOrder = await Transaction.findOne({
      where: { id: createOrder.id },
      attributes: {
        exclude: ["orderbyId", "ordertoId", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          as: "orderBy",
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
        {
          model: User,
          as: "orderTo",
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
      message: "hired successfully created",
      data: { hired: getOrder },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { status } = req.query;
    const { id } = req.user;

    if (status === "my-offer") {
      const getTransactions = await Transaction.findAll({
        where: { ordertoId: id },
        attributes: {
          exclude: ["orderbyId", "ordertoId", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: User,
            as: "orderBy",
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
          {
            model: User,
            as: "orderTo",
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
          {
            model: Project,
            as: "project",
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
          },
        ],
      });
      return res.status(200).json({
        status: "Success",
        message: "Transaction successfully loaded",
        data: { transactions: getTransactions },
      });
    } else {
      const getTransactions = await Transaction.findAll({
        where: { orderbyId: id },
        attributes: {
          exclude: ["orderbyId", "ordertoId", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: User,
            as: "orderBy",
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
          {
            model: User,
            as: "orderTo",
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
          {
            model: Project,
            as: "project",
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
          },
        ],
      });

      return res.status(200).json({
        status: "Success",
        message: "Transaction successfully loaded",
        data: { transactions: getTransactions },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const { status } = req.body;

    const transactionExist = await Transaction.findOne({
      where: { id },
    });

    if (!transactionExist) {
      return res.status(400).json({
        status: "Error",
        message: "Transaction Not Found",
      });
    }

    await Transaction.update({ status }, { where: { id } });

    const transactionAfterUpdate = await Transaction.findOne({
      where: { id },
      attributes: {
        exclude: ["orderbyId", "ordertoId", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          as: "orderBy",
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
        {
          model: User,
          as: "orderTo",
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
    res.status(200).json({
      status: "Success",
      message: "Transaction successfully updated",
      data: { transaction: transactionAfterUpdate },
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
  order,
  getTransactions,
  updateTransaction,
};

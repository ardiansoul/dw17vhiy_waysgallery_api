"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, {
        as: "orderBy",
        foreignKey: "orderbyId",
      });
      Transaction.belongsTo(models.User, {
        as: "orderTo",
        foreignKey: "ordertoId",
      });
      Transaction.hasOne(models.Project, {
        as: "project",
        foreignKey: "transactionId",
      });
    }
  }
  Transaction.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      status: DataTypes.STRING,
      price: DataTypes.INTEGER,
      orderbyId: DataTypes.INTEGER,
      ordertoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};

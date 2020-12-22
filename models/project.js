"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsTo(models.Transaction, {
        foreignKey: "transactionId",
        as: "Transaction",
      });
      Project.hasMany(models.projectPhoto, {
        as: "photos",
        foreignKey: "projectId",
      });
    }
  }
  Project.init(
    {
      transactionId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};

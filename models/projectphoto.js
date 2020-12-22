"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class projectPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Photo.belongsTo(models.Post, { as: "photos", foreignKey: "postId" });
      projectPhoto.belongsTo(models.Project, {
        as: "photos",
        foreignKey: "projectId",
      });
    }
  }
  projectPhoto.init(
    {
      image: DataTypes.STRING,
      // postId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "projectPhoto",
    }
  );
  return projectPhoto;
};

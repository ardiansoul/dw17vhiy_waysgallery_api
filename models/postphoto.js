"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class postPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      postPhoto.belongsTo(models.Post, { as: "photos", foreignKey: "postId" });
      // Photo.belongsTo(models.Project, {
      //   as: "photo",
      //   foreignKey: "projectId",
      // });
    }
  }
  postPhoto.init(
    {
      image: DataTypes.STRING,
      postId: DataTypes.INTEGER,
      // projectId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "postPhoto",
    }
  );
  return postPhoto;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follower.belongsTo(models.User, {
        as: "follower",
        foreignKey: "followedId",
      });
      Follower.belongsTo(models.User, {
        as: "followed",
        foreignKey: "followerId",
      });
    }
  }
  Follower.init(
    {
      followedId: DataTypes.INTEGER,
      followerId: DataTypes.INTEGER,
      value: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Follower",
    }
  );
  return Follower;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Art, {
        as: "arts",
        foreignKey: "createdById",
      });
      User.hasMany(models.Post, {
        as: "posts",
        foreignKey: "userId",
      });
      User.hasMany(models.Transaction, {
        as: "orderBy",
        foreignKey: "orderbyId",
      });
      User.hasMany(models.Transaction, {
        as: "orderTo",
        foreignKey: "ordertoId",
      });
      User.belongsToMany(models.User, {
        as: "follower",
        foreignKey: "followedId",
        through: "Follower",
      });
      User.belongsToMany(models.User, {
        as: "followed",
        foreignKey: "followerId",
        through: "Follower",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      greating: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

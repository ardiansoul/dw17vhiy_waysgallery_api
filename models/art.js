"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Art extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Art.belongsTo(models.User, {
        as: "createdBy",
        foreignKey: "createdById",
      });
    }
  }
  Art.init(
    {
      image: DataTypes.STRING,
      createdById: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Art",
    }
  );
  return Art;
};

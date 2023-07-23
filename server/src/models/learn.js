"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Learn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Learn.belongsTo(models.VocabSet, { foreignKey: "vocabset_id" });
      Learn.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Learn.init(
    {
      user_id: DataTypes.INTEGER,
      vocabset_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Learn",
    }
  );
  return Learn;
};

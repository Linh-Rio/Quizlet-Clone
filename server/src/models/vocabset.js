"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VocabSet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VocabSet.belongsTo(models.User, { foreignKey: "user_id" });
      VocabSet.belongsToMany(models.User, { through: "Learn" });
      VocabSet.hasMany(models.FlashCard, { foreignKey: "vocabset_id" });
    }
  }
  VocabSet.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "VocabSet",
    }
  );
  return VocabSet;
};

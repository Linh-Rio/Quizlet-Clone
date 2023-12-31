"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FlashCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FlashCard.belongsTo(models.VocabSet, { foreignKey: "vocabset_id" });
    }
  }
  FlashCard.init(
    {
      front: DataTypes.TEXT,
      back: DataTypes.TEXT,
      image: DataTypes.BLOB("long"),
      vocabset_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "FlashCard",
    }
  );
  return FlashCard;
};

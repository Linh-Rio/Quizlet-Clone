'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FlashCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FlashCard.init({
    vocabSetId: DataTypes.INTEGER,
    front: DataTypes.TEXT,
    back: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'FlashCard',
  });
  return FlashCard;
};
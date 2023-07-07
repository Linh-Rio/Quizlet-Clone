"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Learns", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      vocabset_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("Learns", {
      fields: ["vocabset_id"],
      type: "foreign key",
      name: "fk_vocabsetm_id",
      references: {
        table: "VocabSets",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addConstraint("Learns", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_usern_id",
      references: {
        table: "Users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Learns");
  },
};

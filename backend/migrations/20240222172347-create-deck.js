"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("decks", {
      deck_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      deck_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
        /**
         * references: This establishes a foreign key constraint that
         * references the user_id column in the users table.
         */
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        /**
         * onUpdate: 'CASCADE' and onDelete: 'CASCADE':
         * These options specify the behavior of the foreign key constraint.
         * With CASCADE, if a referenced user's id changes or the user is deleted,
         * the corresponding deck will be updated or deleted accordingly.
         */
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("decks");
  },
};

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    static associate({ User }) {
      // Define association here
      Deck.belongsTo(User, { foreignKey: "user_id" });
    }
  }

  Deck.init(
    {
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
      /**
       *  Including a column for user_id
       *  would establish an association between users and decks.
       */
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "decks",
      modelName: "Deck",
    }
  );

  return Deck;
};

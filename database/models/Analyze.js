const { DataTypes } = require("sequelize");
const User = require("./User");
const db = require("../db");

const Anaylize = db.define("Anaylize", {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  predication: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imgPath: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

module.exports = Anaylize;

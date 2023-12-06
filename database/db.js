require("dotenv").config();

const Sequelize = require("sequelize");

let connString = process.env.connString;

const db = new Sequelize(connString, {
  logging: false,
});

module.exports = db;

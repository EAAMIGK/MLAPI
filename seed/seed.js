// const sequelize = require('sequelize');
//const seedUsers = require('./seedUsers');
const { Anaylize } = require("../database/index");
const seedAnalysis = require("./seedAnalyze");
const db = require("../database/db");

const seedData = async () => {
  await db.sync({ force: true });
  //await seedAnalysis();
  //await Anaylize.truncate();
};

seedData()
  .then(() => {
    console.log("all data seeded");
    process.exit();
  })
  .catch((err) => {
    console.log(err.message);
    console.error("error seeding ");
    process.exit(1);
  });

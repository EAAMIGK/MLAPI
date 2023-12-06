// const db = require('../database/db');
const { Anaylize } = require("../database/index");
const anaylysisData = [
  {
    title: "test",
    description: "test description",
    imgPath: "test..",
    prediction: "sometest",
  },
];

const seedAnalysis = async () => {
  try {
    for (let analyze of anaylysisData) {
      await Anaylize.create(analyze);
    }
    console.log("Analysis seeded");
  } catch (e) {
    console.error("error seedings users");
  }
};

module.exports = seedAnalysis;

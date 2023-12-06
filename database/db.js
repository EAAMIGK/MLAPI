const Sequelize = require("sequelize");

let connString =
  "postgresql://postgres:Storepatter123!!@db.rfaqykrfrnyqupvubahm.supabase.co:5432/postgres";

const db = new Sequelize(connString, {
  logging: false,
});

module.exports = db;

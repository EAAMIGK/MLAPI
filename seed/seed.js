// const sequelize = require('sequelize');
const seedUsers = require('./seedUsers');
const db = require('../database/db');

const seedData = async () => {
	await db.sync({ force: true });
	await seedUsers();
};

seedData()
	.then(() => {
		console.log('all data seeded');
		process.exit();
	})
	.catch((err) => {
		console.error('error seeding ');
		process.exit(1);
	});

// const db = require('../database/db');
const { User } = require('../database/index');
const usersData = [
	{ username: 'basitdotali', password: '123' },
	{ username: 'mike321', password: '123' },
	{ username: 'waleed11', password: '123' },
];

const seedUsers = async () => {
	try {
		for (let user of usersData) {
			await User.create(user);
		}
		console.log('Users seeded');
	} catch (e) {
		console.error('error seedings users');
	}
};

module.exports = seedUsers;

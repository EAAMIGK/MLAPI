const Anaylize = require('./models/Analyze');
const User = require('./models/User');

const db = require('./db');

Anaylize.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Anaylize, { foreignKey: 'userId' });

module.exports = {
	db,
	User,
	Anaylize,
};

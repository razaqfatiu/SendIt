const bcrypt = require('bcryptjs');
const env = require('../config/env');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
	host: env.DATABASE_HOST,
	dialect: env.DATABASE_DIALECT,
	port: env.DATABASE_PORT
});

const db = {};

const userSchema = sequelize.define('User', {
	username: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true
		}
	},
	email: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true
		}
	},
	password: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true
		}
	}
});

const User = module.exports = sequelize.model('User', userSchema);
module.exports.getUserbyFullname = (username, callback) => {
	User.findOne({
		where: {
			email: email
		}
	}, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
		callback(null, isMatch);
	});
};

module.exports.createUser = (user, callback) => {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(user.password, salt, function (err, hash) {
			user.password = hash;
			User.create(user);
		});
	});
};

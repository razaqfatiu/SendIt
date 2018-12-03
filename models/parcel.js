const env = require('../config/env');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT,
    port: env.DATABASE_PORT
});

const parcelSchema = sequelize.define('Parcel', {
    parcelname: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    weight: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    from: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    deliverto: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    message: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    }
});

const Parcel = module.exports = sequelize.model('Parcel', parcelSchema);
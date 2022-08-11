const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('jds_backend_app', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        set(val) {
            this.setDataValue('email', val.toLowerCase());
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
            this.setDataValue('password', bcrypt.hashSync(val, 10));
        }
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    },
    nik: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    underscored: true,
    timestamps: true,
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    defaultScope: {
        attributes: { exclude: ['password'] },
    }
});

module.exports = User;
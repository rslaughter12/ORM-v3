const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.createUser = async function (username, email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.create({ username, email, password: hashedPassword });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create user');
  }
};

module.exports = User;

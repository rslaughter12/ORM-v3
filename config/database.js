const { Sequelize } = require('sequelize');

// Replace 'your_database_name', 'your_username', and 'your_password' with your actual database credentials
const sequelize = new Sequelize('blogPost', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('blogPost', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Post;

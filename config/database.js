const { Sequelize } = require('sequelize');

// Replace 'your_database_name', 'your_username', and 'your_password' with your actual database credentials

let sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
sequelize = new Sequelize('blogPost', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});
}
module.exports = sequelize;
const Sequelize = require('sequelize').Sequelize;
const StudentModel = require('./models/student.model');

const sequelize = new Sequelize('postgres://postgres:Database5216@localhost:4200/postgres');


const Student = StudentModel(sequelize, Sequelize);

// Create our tables using sync
sequelize.sync().then(() => console.log("Tables are created."));

// Export our models
module.exports = {
  Student
}
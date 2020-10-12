const Sequelize = require('sequelize').Sequelize;
const StudentModel = require('./models/student.model');
const UserModel = require('./models/user.model');

const sequelize = new Sequelize('postgres://postgres:Database5216@localhost:4200/postgres');


const Student = StudentModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

User.associate = models => {
    User.hasMany(models.Student, {
        onDelete: "cascade"
    });
}

Student.associate = models => {
    Student.belongsTo(models.User);
}

// Create our tables using sync
sequelize.sync().then(() => console.log("Tables are created."));

// Export our models
module.exports = {
  Student,
  User

}
const Sequelize = require('sequelize').Sequelize;
const StudentModel = require('./models/student.model');
const UserModel = require('./models/user.model');
const AssignmentModel = require('./models/assignment.model');
const GradeModel = require('./models/grade.model')

const sequelize = new Sequelize(
    'postgres://postgres:Database5216@localhost:4200/postgres'
);

const Student = StudentModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Assignment = AssignmentModel(sequelize, Sequelize);
const Grade = GradeModel(sequelize, Sequelize);

// User.associate = models => {
//     User.hasMany(models.Student, {
//         onDelete: "cascade"
//     });
// }

User.hasMany(Student);
Student.belongsTo(User);
User.hasMany(Assignment);
Assignment.belongsTo(User);
Student.hasMany(Grade);
Grade.belongsTo(Student);
Assignment.hasMany(Grade);
Grade.belongsTo(Assignment);



// through is required!



// Student.associate = models => {
//     Student.belongsTo(models.User);
// }

// Create our tables using sync
sequelize.sync().then(() => console.log('Tables are created.'));

// Export our models
module.exports = {
    Student,
    User,
    Assignment,
    Grade
};

const Sequelize = require('sequelize').Sequelize;
const StudentModel = require('./models/student.model');
const UserModel = require('./models/user.model');
const AssignmentModel = require('./models/assignment.model');
const GradeModel = require('./models/grade.model');

const sequelize = new Sequelize(process.env.DATABASE_CONNECTION);

const Student = StudentModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Assignment = AssignmentModel(sequelize, Sequelize);
const Grade = GradeModel(sequelize, Sequelize);

User.hasMany(Student);
Student.belongsTo(User);
User.hasMany(Assignment);
Assignment.belongsTo(User);
Student.hasMany(Grade);
Grade.belongsTo(Student);
Assignment.hasMany(Grade);
Grade.belongsTo(Assignment);

// Create our tables using sync
sequelize.sync().then(() => console.log('Tables are created.'));

// Export our models
module.exports = {
    Student,
    User,
    Assignment,
    Grade
};

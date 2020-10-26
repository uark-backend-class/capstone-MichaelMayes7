const db = require('../db');
const User = db.User;


exports.getAll = async (req, res) => {
    // Get all of our expenses
    const users = await User.findAll({
        raw: true,
        where: { userId: req.user.id }
    });
    const numUsers = await User.count({ where: { userId: req.user.id } });
    const total = await User.sum('amount', {
        where: { userId: req.user.id }
    });
    // render our list view
    res.render('users-list', { numUsers, users, total });
};

exports.addStudentAssignmentInstace = async (req, res) => {
    try { let student = await Student.findByPk(req.params.id, { raw: true });
     let assignment = await Student.findByPk(req.params.userId, {raw: true});
     let user = await User.findByPk(req.params.id, { raw: true });
     const studentAssignment = Assignment.create({
         assignment_name: `${assignment.id}`,
         student_name: `${student.first_name}${student.last_name}`
     });
     res.render('list', { students, studentAssignment });
 } catch (error) {
     console.log(error.message);
     }
 }



exports.update = async (req, res) => {
    // req.user.id
    req.body.userId = req.user.id;
    await User.upsert(req.body);
    res.redirect('/');
};

exports.editView = async (req, res) => {
    let user = await User.findByPk(req.params.id, { raw: true });
    res.render('add-edit-user', { user });
};

exports.delete = async (req, res) => {
    await User.destroy({ where: { id: req.params.id } });
    // or
    // let expense = await Expense.findByPk(req.params.id, { raw: true });
    // await expense.destroy();
    res.redirect('/');
};

exports.listUsers = async (req, res) => {
    let users = await User.findAll({ raw: true });
    res.render('users-list', { users });
};

exports.listMyStudents = (req, res) => {
    res.render('list')
}

exports.addUser = (req, res) => {
    res.render('add-edit-user');
};

exports.updateUser = async (req, res) => {
    await User.upsert(req.body);
    res.redirect('users-list');
};

exports.editUser = async (req, res) => {
    let user = await User.findByPk(req.params.id, { raw: true });
    res.render('add-edit-user', { user });
};

exports.deleteUser = async (req, res) => {
    let user = await User.findByPk(req.params.id);
    await user.destroy();
    res.redirect('/');
};
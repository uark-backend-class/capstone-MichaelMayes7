const db = require('../db');
const User = db.User;

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
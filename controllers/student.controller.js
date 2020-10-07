const db = require('../db');
const Student = db.Student;

exports.listStudents = async (req, res) => {
    let students = await Student.findAll({ raw: true });
    res.render('list', { students });
};

exports.addStudent = (req, res) => {
    res.render('add-edit');
};

exports.updateStudent = async (req, res) => {
    await Student.upsert(req.body);
    res.redirect('/');
};

exports.editStudent = async (req, res) => {
    let student = await Student.findByPk(req.params.id, { raw: true });
    res.render('add-edit', { student });
};

exports.deleteStudent = async (req, res) => {
    let student = await Student.findByPk(req.params.id);
    await student.destroy();
    res.redirect('/');
};

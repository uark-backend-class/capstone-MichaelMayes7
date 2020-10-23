const db = require('../db');
const Grade = db.Grade;



exports.getAllGrades = async (req, res) => {
    // Get all of our expenses
    try {
    const grades = await Grade.findAll({
        raw: true,
        where: { gradeId: req.grade.id },
        where: { studentId: req.student.id },
        where: { assignmentId: req.assignment.id}
    });
    // const numGrades = await Grade.count({ where: { userId: req.user.id } });
    // const total = await Grade.sum('amount', {
    //     where: { userId: req.user.id }
    // });
    // render our list view
    res.render('grade-list', { grades });}
    catch (error) {
        console.log(error.message)
    }
};

exports.updateGrade = async (req, res) => {
    
    try {
    req.body.userId = req.user.id;
    req.body.gradeId = req.grade.id;
    await Grade.upsert(req.body);
    res.redirect('grade-list');}
    catch (error) {
        console.log(error.message);
    }
};

exports.editViewGrade = async (req, res) => {
    let grade = await Grade.findByPk(req.params.id, { raw: true });
    res.render('add-edit-grade', { grade });
};

exports.delete = async (req, res) => {
    await Grade.destroy({ where: { id: req.params.id } });
    // or
    // let expense = await Expense.findByPk(req.params.id, { raw: true });
    // await expense.destroy();
    res.redirect('grade-list');
};

exports.listGrades = async (req, res) => {
    let grades = await Grade.findAll({ raw: true });
    res.render('grade-list', { grades });
};


exports.addGrade = (req, res) => {
    res.render('add-edit-grade');
};

exports.updateGrade = async (req, res) => {
    await Grade.upsert(req.body);
    res.redirect('grade-list');
};

exports.editGrade = async (req, res) => {
    let grade = await Grade.findByPk(req.params.id, { raw: true });
    res.render('add-edit-grade', { grade });
};

exports.deleteGrade = async (req, res) => {
    let grade = await Grade.findByPk(req.grade.id);
    await grade.destroy();
    res.redirect('grade-list');
};
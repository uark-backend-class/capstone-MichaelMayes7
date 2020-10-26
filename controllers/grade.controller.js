const db = require('../db');
const Grade = db.Grade;
const Assignment = db.Assignment;
const Student = db.Student;



// exports.getAllGrades = async (req, res) => {
//     // Get all of our expenses
//     try {
//     const grades = await Grade.findAll({
//         raw: true,
//         where: { gradeId: req.grade.id },
//         where: { studentId: req.student.id },
//         where: { assignmentId: req.assignment.id}
//     });
//     // const numGrades = await Grade.count({ where: { userId: req.user.id } });
//     // const total = await Grade.sum('amount', {
//     //     where: { userId: req.user.id }
//     // });
//     // render our list view
//     res.render('grade-list', { grades });}
//     catch (error) {
//         console.log(error.message)
//     }
// };

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

// exports.editViewGrade = async (req, res) => {
//     let grade = await Grade.findByPk(req.params.id, { raw: true });
//     res.render('add-edit-grade', { grade });
// };

exports.delete = async (req, res) => {
    await Grade.destroy({ where: { id: req.params.id } });
    // or
    // let expense = await Expense.findByPk(req.params.id, { raw: true });
    // await expense.destroy();
    res.redirect('grade-list');
};

exports.listGrades = async (req, res) => {

    let assignments = await Assignment.findAll({ raw: true });
    let grades = await Grade.findAll({where: { studentId: req.params.id }}, {raw: true});
    let student = await Student.findByPk(req.params.id, { raw: true });
    for (let assignment of assignments) {
        let foundGrade = grades.find( grade => grade.assignmentId == assignment.id);
        if (foundGrade) {
            assignment.grade = foundGrade;
        }
    }
    console.log(student);
    res.render('grade-list', { assignments, student });
};


exports.addGrade = async (req, res) => {
    let student =  await Student.findByPk(req.params.studentId);
    let assignment = await Assignment.findByPk(req.params.assignmentId);
    let grade = await Grade.findByPk(req.params.id)

    res.render('add-edit-grade', { student, assignment, grade });
};

exports.updateGrade = async (req, res) => {
    
    let grade = await Grade.upsert(req.body);
    res.redirect('grade-list', { grade });
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
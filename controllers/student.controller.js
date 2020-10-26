const db = require('../db');
const Student = db.Student;
const Assignment = db.Assignment;

exports.listStudents = async (req, res) => {
    let students = await Student.findAll({ raw: true });
    res.render('list', { students });
};

exports.addStudent = (req, res) => {
    res.render('add-edit');
};

exports.addStudentAssignmentInstace = async (req, res) => {
   try { let student = await Student.findByPk(req.params.id, { raw: true });
    let assignment = await Student.findByPk(req.params.userId, {raw: true});
    const studentAssignment = Assignment.create({
        assignment_name: `${assignment.id}`,
        student_name: `${student.first_name}${student.last_name}`
    });
    res.render('list', { students, studentAssignment });
} catch (error) {
    console.log(error);
    }
}
exports.updateStudent = async (req, res) => {
    req.body.userId = req.user.id;
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

const db = require('../db');
const Assignment = db.Assignment;
const User = db.User;


exports.addAssignment = (req, res) => {
    res.render('add-edit-assignment');
};


exports.getAllAssignments = async (req, res) => {
    // Get all of our expenses
    try {
    let user = await Assignment.findByPk(req.params.userId);
    const assignments = await Assignment.findAll({
        raw: true,
        where: { userId: req.assignment.userId },
        where: { assigmentId: req.assignment.id },
        
    });
    // const numAssignments = await Assignment.count({ where: { assignmentId: req.assignment.id } });
    // const total = await Assignment.sum('amount', {
    //     where: { assignmentId: req.assignment.id }
    // });
    // render our list view
    res.render('assignment-list', { user, assignments });
} catch (error) {
    console.log(error.message)
}
};

exports.updateAssignment = async (req, res) => {
    // req.user.id
    try {
    req.body.assignmentId = req.assignment.id;
    await Assignment.upsert(req.body);
    res.redirect('assignment-list');
} catch (error) {
    console.log(error.message);
}
};

exports.editViewAssignments = async (req, res) => {
    let assignments = await Assignment.findByPk(req.params.id, { raw: true });
    res.render('add-edit-assignment', { assignments });
};

exports.deleteAssignment = async (req, res) => {
    await Assignment.destroy({ where: { id: req.params.id } });
    // or
    // let expense = await Expense.findByPk(req.params.id, { raw: true });
    // await expense.destroy();
    res.redirect('assignment-list');
};

exports.editAssignment = async (req, res) => {
    let assignment = await Assignment.findByPk(req.params.id, { raw: true });
    res.render('add-edit-assignment', { assignment });
};






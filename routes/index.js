const router = require('express').Router();
const studentController = require('../controllers/student.controller');
const userController = require('../controllers/user.controller');
const assignmentController = require('../controllers/assignment.controller');
const gradeController = require('../controllers/grade.controller');
const passport = require('passport');
const isAuthenticated = require('../middleware/is-authenticated');

router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/');
    }
);
router.use(isAuthenticated);
router.get('/users', userController.getAll);
router.get('/', studentController.listStudents);
router.get('/add', studentController.addStudent);
router.post('/update', studentController.updateStudent);
router.get('/edit/:id', studentController.editStudent);
router.get('/delete/:id', studentController.deleteStudent);

router.get('/users-list', userController.listUsers);
router.get('/add-edit-user', userController.addUser);
router.post('/update-user', userController.updateUser);
router.get('/edit-user/:id', userController.editUser);
router.get('/delete-user/:id', userController.deleteUser);
router.get('/auth/logout', (req, res) => {
    req.logout();
    res.send('Logout successful');
});
router.get('/add-assignment', assignmentController.addAssignment);

router.get('/assignment-list', assignmentController.getAllAssignments);
// router.get('/add-edit-assignment')(assignmentController.editViewAssignments(assignment, { through: { role: 'manager' }}));
router.get('/add-edit-assignment', assignmentController.editViewAssignments);
router.post('/update-assignment', assignmentController.updateAssignment);
router.get('/edit-assignment/:id', assignmentController.editAssignment);
router.get('/delete-assignment/:id', assignmentController.deleteAssignment);

router.get('/grade-list', gradeController.getAllGrades);
router.get('/add-grade', gradeController.addGrade);
router.get('/grade-list', gradeController.listGrades);
// router.get('/add-edit-assignment')(assignmentController.editViewAssignments(assignment, { through: { role: 'manager' }}));
router.get('/add-edit-grade', gradeController.editViewGrade);
router.post('/update-grade', gradeController.updateGrade);
router.get('/edit-grade/:id', gradeController.editGrade);
router.get('/delete-grade/:id', gradeController.deleteGrade);

module.exports = router;
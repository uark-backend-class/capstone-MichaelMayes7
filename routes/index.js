const router = require('express').Router();
const studentController = require('../controllers/student.controller');
const userController = require('../controllers/user.controller');
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

module.exports = router;
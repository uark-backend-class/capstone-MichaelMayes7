const router = require('express').Router();
const studentController = require('../controllers/student.controller');
const userController = require('../controllers/user.controller');

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

module.exports = router;
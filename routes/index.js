const router = require('express').Router();
const studentController = require('../controllers/student.controller');

router.get('/', studentController.listStudents);
router.get('/add', studentController.addStudent);
router.post('/update', studentController.updateStudent);
router.get('/edit/:id', studentController.editStudent);
router.get('/delete/:id', studentController.deleteStudent);

module.exports = router;
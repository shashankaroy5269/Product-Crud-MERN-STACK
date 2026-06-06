const express = require('express');
const StudentController = require('../../controller/api/StudentController');

const router = express.Router();

router.post('/create/student', StudentController.createStudent);
router.get('/student', StudentController.getStudent);
router.get('/student/:id', StudentController.getsingleStudent);
router.put('/student/update/:id', StudentController.updateStudent);
router.delete('/student/delete/:id', StudentController.deleteStudent);

module.exports = router;
const {Router} = require ('express')
const router = Router();
const alumnoscrtl = require ('../controller/alumnos.controller')

router.get('/students', alumnoscrtl.getStudents);
router.get('/students/:students_id', alumnoscrtl.getStudents);
router.post('/students', alumnoscrtl.postStudent);
router.put('/students', alumnoscrtl.putStudent);
router.delete('/students', alumnoscrtl.deleteStudent);

module.exports = router
const {Router} = require ('express')
const router = Router();
const notascrtl = require ('../controller/signature_mark.controller')


router.get('/media/:student_id', notascrtl.notaMedia)
router.get('/apuntadas/:student_id', notascrtl.asignaturas)
router.get('/apuntadas', notascrtl.listaAsignaturas)
router.get('/apuntadas2', notascrtl.listaAsignaturas2)
router.get('/impartidas/:teachers_id', notascrtl.impartidas)
router.get('/impartidas', notascrtl.listaImpartidas)

module.exports = router
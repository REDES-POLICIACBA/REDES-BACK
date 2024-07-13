import { Router } from 'express'
import comisionesController from '../controllers/comisiones'
import { isFinish } from '../middlewares/comision/isFinish'
import { isAdmin } from '../middlewares/comision/isAdmin'
import passport from '../middlewares/passport'

const router = Router()

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    comisionesController.createComision,
)
router.put('/:id', comisionesController.updateComision)
router.delete('/:id', comisionesController.deleteComision)
router.get('/', comisionesController.getAllComisiones)
router.post('/asignar/:id', comisionesController.asignarComision)
router.post(
    '/aply/:idUser/:idComision',
    isFinish,
    comisionesController.applyComision,
)
router.post(
    '/desaply/:idUser/:idComision',
    isFinish,
    comisionesController.desAplicarComision,
)

export default router

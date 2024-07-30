import { Router } from 'express'
import dependenciaController from '../controllers/dependencia'
import passport from '../middlewares/passport'
import { isAdmin } from '../middlewares/comision/isAdmin'
const router = Router()

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    dependenciaController.create,
)

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    dependenciaController.update,
)

router.get('/', dependenciaController.getAllDependencias)
export default router

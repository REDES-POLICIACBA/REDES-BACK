import { Router } from 'express'
import comisionesController from '../controllers/comisiones'
import { isFinish } from '../middlewares/comision/isFinish'
import { isAdmin } from '../middlewares/comision/isAdmin'
import passport from '../middlewares/passport'
import { isInstalador } from '../middlewares/comision/isInstalador'
import { isApplyComision } from '../middlewares/comision/isApplyComision'
import { isProperty } from '../middlewares/comision/isProperty'
import { alreadyUsers } from '../middlewares/comision/alreadyUsers'

const router = Router()

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    alreadyUsers,
    isAdmin,
    comisionesController.createComision,
)

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    isProperty,
    isInstalador,
    comisionesController.updateComision,
)

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    comisionesController.deleteComision,
)

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    isInstalador,
    comisionesController.getAllComisiones,
)

router.get(
    '/enprogreso',
    passport.authenticate('jwt', { session: false }),
    isInstalador,
    comisionesController.getComisionesByUser,
)

router.post(
    '/asignar/:id',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    comisionesController.asignarComision,
)

router.post(
    '/apply/:id',
    passport.authenticate('jwt', { session: false }),
    isApplyComision,
    isFinish,
    isInstalador,
    comisionesController.applyComision,
)

router.post(
    '/desaply/:id',
    passport.authenticate('jwt', { session: false }),
    isFinish,
    isInstalador,
    comisionesController.desAplicarComision,
)

export default router

import { Router } from 'express'
import notificationController from '../controllers/notifications'
import passport from '../middlewares/passport'
const router = Router()

router.post('/comision')
router.put('/:id', notificationController.notificationIsRead)
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    notificationController.deleteNotification,
)

export default router

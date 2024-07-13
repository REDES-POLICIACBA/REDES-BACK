import { Router } from 'express'
import notificationController from '../controllers/notifications'
const router = Router()

router.post('/comision')
router.put('/:id', notificationController.notificationIsRead)

export default router

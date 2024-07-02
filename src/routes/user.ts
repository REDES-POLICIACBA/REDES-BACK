import { Router } from 'express'
import { userController } from '../controllers/user'
const router = Router()

router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
export default router

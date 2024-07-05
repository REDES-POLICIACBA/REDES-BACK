import { Router } from 'express'
import dependenciaController from '../controllers/dependencia'

const router = Router()

router.post('/', dependenciaController.create)
router.put('/:id', dependenciaController.update)
export default router

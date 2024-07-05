import { Router } from 'express'
import dependenciaController from '../controllers/dependencia'

const router = Router()

router.post('/', dependenciaController.create)

export default router

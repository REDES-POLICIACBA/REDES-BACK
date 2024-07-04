import { Router } from 'express'
import comisionesController from '../controllers/comisiones'

const router = Router()

router.post('/', comisionesController.createComision)

export default router

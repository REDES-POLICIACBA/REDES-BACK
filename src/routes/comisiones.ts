import { Router } from 'express'
import comisionesController from '../controllers/comisiones'

const router = Router()

router.post('/', comisionesController.createComision)
router.put('/:id', comisionesController.updateComision)
export default router

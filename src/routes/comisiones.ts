import { Router } from 'express'
import comisionesController from '../controllers/comisiones'

const router = Router()

router.post('/', comisionesController.createComision)
router.put('/:id', comisionesController.updateComision)
router.delete('/:id', comisionesController.deleteComision)
router.get('/', comisionesController.getAllComisiones)
router.post('/asignar/:id', comisionesController.asignarComision)
export default router

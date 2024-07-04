import { Router } from 'express'
import routerUser from './user'
import routerComisiones from './comisiones'
import routerEstadisticas from './estadisticas'

const router = Router()

router.use('/user', routerUser)
router.use('/comisiones', routerComisiones)
router.use('/estadisticas', routerEstadisticas)
export default router

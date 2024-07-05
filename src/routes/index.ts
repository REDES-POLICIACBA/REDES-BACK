import { Router } from 'express'
import routerUser from './user'
import routerComisiones from './comisiones'
import routerEstadisticas from './estadisticas'
import routerNotificacion from './notifications'
import routerDependencia from './dependencias'

const router = Router()

router.use('/user', routerUser)
router.use('/comisiones', routerComisiones)
router.use('/estadisticas', routerEstadisticas)
router.use('/notifications', routerNotificacion)
router.use('/dependencias', routerDependencia)
export default router

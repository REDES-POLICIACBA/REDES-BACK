import { Router } from 'express'
import routerUser from './user'
import routerComisiones from './comisiones'
const router = Router()

router.use('/user', routerUser)
router.use('/comisiones', routerComisiones)
export default router

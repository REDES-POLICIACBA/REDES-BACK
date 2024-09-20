import { Router } from 'express'
import estadisticaController from '../controllers/estadisticas'
const router = Router()

router.get('/totales', estadisticaController.getEstadisticasTotales)
router.get('/anuales/:ano', estadisticaController.getEstadisticasAnuales)
router.get(
    '/mensuales/:mes/:ano',
    estadisticaController.getEstadisticasMensuales,
)

export default router

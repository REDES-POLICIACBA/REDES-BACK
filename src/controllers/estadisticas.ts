import type CustomError from '../interfaces/CustomError'
import { response } from '../res/Response'
import EstadisticaService from '../services/estadistica.service'
import type { Request, Response } from 'express'

const service = new EstadisticaService()

const estadisticaController = {
  async getEstadisticasTotales(_req: Request, res: Response) {
    try {
      const estadisticas = await service.getEstadisticasTotales()
      response.isOk(res, 200, 'Estadisticas Totales', estadisticas)
    } catch (error) {
      response.isError(res, 500, error as CustomError, 'estadisticas')
    }
  },

  async getEstadisticasAnuales(req: Request, res: Response) {
    try {
      const { ano } = req.params
      const estadisticas = await service.getEstadisticasAnuales(
        //@ts-ignore
        new Date(ano, 0, 1),
      )
      response.isOk(res, 200, 'Estadisticas Anuales', estadisticas)
    } catch (error) {
      response.isError(res, 500, error as CustomError, 'estadisticas')
    }
  },
  async getEstadisticasMensuales(req: Request, res: Response) {
    try {
      const { mes, ano } = req.params
      const estadisticas = await service.getEstadisticasMensuales(
        Number.parseInt(mes),
        Number(ano),
      )
      response.isOk(res, 200, 'Estadisticas Mensuales', estadisticas)
    } catch (error) {
      response.isError(res, 500, error as CustomError, 'estadisticas')
    }
  },
}
export default estadisticaController

import type { Request, Response } from 'express'
import Comisiones from '../models/comisiones'
import ComisionesService from '../services/comisiones.service'
import { response } from '../res/Response'
import type CustomError from '../interfaces/CustomError'

//@ts-ignore
const services = new ComisionesService(Comisiones)

const comisionesController = {
  async createComision(req: Request, res: Response) {
    try {
      await services.create(req.body)
      response.isOk(res, 201, 'Comisión creada correctamente')
    } catch (error) {
      response.isError(res, 500, error as CustomError, 'comision')
    }
  },

  async updateComision(req: Request, res: Response) {
    try {
      //@ts-ignore
      const comision = await services.update(req.body, req.params)
      response.isOk(res, 200, 'Comisión actualizada correctamente', {
        comision,
      })
    } catch (error) {
      response.isError(res, 500, error as CustomError, 'comision')
    }
  },
}
export default comisionesController
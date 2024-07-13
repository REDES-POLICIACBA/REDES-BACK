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
            const comision = await services.update(req.body, req.params)
            response.isOk(res, 200, 'Comisión actualizada correctamente', {
                comision,
            })
        } catch (error) {
            response.isError(res, 500, error as CustomError, 'comision')
        }
    },

    async deleteComision(req: Request, res: Response) {
        try {
            await services.delete(req.params)
            response.isOk(res, 200, 'Comisión eliminada correctamente')
        } catch (error) {
            response.isError(res, 500, error as CustomError, 'comision')
        }
    },
    async getAllComisiones(req: Request, res: Response) {
        try {
            const params = req.query
            const comisiones = await services.getAll(params)
            response.isOk(
                res,
                200,
                'Comisiones obtenidas correctamente',
                {},
                comisiones,
            )
        } catch (error) {
            response.isError(res, 500, error as CustomError, 'comision')
        }
    },
    async asignarComision(req: Request, res: Response) {
        try {
            const comision = await services.asignarComision(
                req.body,
                req.params,
            )
            response.isOk(res, 200, 'Comisión asignada correctamente', {
                comision,
            })
        } catch (error) {
            response.isError(res, 500, error as CustomError, 'comision')
        }
    },
    async applyComision(req: Request, res: Response) {
        try {
            const { idUser, idComision } = req.params
            //@ts-ignore
            const comision = await services.aplicarComision(idUser, idComision)
            response.isOk(res, 200, 'Comisión aplicada correctamente', {
                comision,
            })
        } catch (error) {
            response.isError(res, 500, error as CustomError, 'comision')
        }
    },
    async desAplicarComision(req: Request, res: Response) {
        try {
            const { idUser, idComision } = req.params
            const comisionDesaplicada = await services.desAplicarComision(
                //@ts-ignore
                idUser,
                idComision,
            )
            response.isOk(res, 200, 'Comisión desaplicada correctamente', {
                comisionDesaplicada,
            })
        } catch (error) {
            response.isError(res, 500, error as CustomError, 'comision')
        }
    },
}
export default comisionesController

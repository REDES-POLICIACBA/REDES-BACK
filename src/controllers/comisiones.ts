import type { Request, Response } from 'express'
import Comisiones from '../models/comisiones'
import ComisionesService from '../services/comisiones.service'
import { response } from '../res/Response'
import type CustomError from '../interfaces/CustomError'
import type UserInterface from '../interfaces/User'

//@ts-ignore
const services = new ComisionesService(Comisiones)

const comisionesController = {
    async createComision(req: Request, res: Response) {
        try {
            await services.create(req.body)
            response.isOk(res, 201, 'Comisión creada correctamente')
        } catch (error) {
            console.log(error)
            response.isError(res, 500, error as CustomError, 'comision')
        }
    },

    async updateComision(req: Request, res: Response) {
        console.log(req.body)
        try {
            const comision = await services.update(
                req.body,
                req.params,
                //@ts-ignore
                req.user,
            )
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
            const user = req.user as UserInterface
            const comisiones = await services.getAll(params, user)
            response.isOk(res, 200, 'Comisiones obtenidas correctamente', {
                comisiones,
            })
        } catch (error) {
            console.log(error)
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
            //@ts-ignore
            const { _id } = req.user
            const { id } = req.params

            //@ts-ignore
            const comision = await services.aplicarComision(_id, id)
            response.isOk(res, 200, 'Comisión aplicada correctamente', {
                comision,
            })
        } catch (error) {
            response.isError(res, 500, error as CustomError, 'comision')
        }
    },
    async desAplicarComision(req: Request, res: Response) {
        try {
            //@ts-ignore
            const { _id } = req.user
            const { id } = req.params
            const comisionDesaplicada = await services.desAplicarComision(
                _id,
                //@ts-ignore
                id,
            )
            response.isOk(res, 200, 'Comisión desaplicada correctamente', {
                comisionDesaplicada,
            })
        } catch (error) {
            response.isError(res, 500, error as CustomError, 'comision')
        }
    },
    async getComisionesByUser(req: Request, res: Response) {
        try {
            //@ts-ignore
            const { _id } = req.user
            const comisiones = await services.getComisionesEnprogreso(_id)
            response.isOk(res, 200, 'Comisiones obtenidas correctamente', {
                comisiones,
            })
        } catch (error) {
            response.isError(
                res,
                500,
                error as CustomError,
                'comisionesEnprogreso',
            )
        }
    },
}
export default comisionesController

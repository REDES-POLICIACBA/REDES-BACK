import type { Request, Response } from 'express'
import Dependencias from '../models/dependencia'
import DependenciaService from '../services/dependencia.service'
import { response } from '../res/Response'
import type CustomError from '../interfaces/CustomError'

const service = new DependenciaService(Dependencias)
const dependenciaController = {
    async create(req: Request, res: Response) {
        try {
            await service.create(req.body)
            response.isOk(res, 201, 'Dependencia creada correctamente')
        } catch (error) {
            response.isError(res, 500, error as CustomError, 'dependencia')
        }
    },
    async update(req: Request, res: Response) {
        try {
            await service.update(req.body, req.params)
            response.isOk(res, 200, 'Dependencia actualizada correctamente')
        } catch (error) {
            response.isError(res, 500, error as CustomError, 'dependencia')
        }
    },
}

export default dependenciaController

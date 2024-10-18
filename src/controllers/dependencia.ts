import type { Request, Response } from 'express'
import Dependencias from '../models/dependencia'
import DependenciaService from '../services/dependencia.service'
import { response } from '../res/Response'
import type CustomError from '../interfaces/CustomError'

//@ts-ignore
const service = new DependenciaService(Dependencias)
const dependenciaController = {
    async create(req: Request, res: Response) {
        try {
            const dependencia = await service.create(req.body)
            console.log(dependencia)
            response.isOk(res, 201, 'Dependencia creada correctamente', {
                dependencia,
            })
        } catch (error) {
            response.isError(res, 400, error as CustomError, 'dependencia')
        }
    },
    async update(req: Request, res: Response) {
        try {
            const dependencia = await service.update(req.body, req.params)
            response.isOk(res, 200, 'Dependencia actualizada correctamente', {
                dependencia,
            })
        } catch (error) {
            response.isError(res, 500, error as CustomError, 'dependencia')
        }
    },
    async getAllDependencias(req: Request, res: Response) {
        try {
            const params = req.query
            const dependencias =
                await service.getAllDependenciasQuerysFilters(params)
            //@ts-ignore
            return res.status(200).json({
                dependencias: dependencias.dependencias,
                totalPages: dependencias.totalPages,
            })
        } catch (error) {
            response.isError(res, 500, error as CustomError, 'dependencia')
        }
    },
    async getAllDependenciasMaps(req: Request, res: Response) {
        try {
            const params = req.query
            const dependencias = await service.getAllDependencias(params)
            response.isOk(res, 200, '', {}, dependencias)
        } catch (error) {
            response.isError(res, 500, error as CustomError, 'dependencia')
        }
    },
}

export default dependenciaController

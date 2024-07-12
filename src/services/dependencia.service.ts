import type Dependencia from '../interfaces/Dependencia'
import type { Model } from 'mongoose'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { ParseParamsToObject } from '../func/ObjectKeys'

class DependenciaService {
    public DependenciaModel: Model<Dependencia>
    constructor(DependenciaModel: Model<Dependencia>) {
        this.DependenciaModel = DependenciaModel
    }
    async create(dependenciaData: Dependencia) {
        try {
            const dependencia =
                await this.DependenciaModel.create(dependenciaData)
            return dependencia
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al intentar crear la dependencia: ${error}`,
            )
        }
    }
    async update(dependencia: Dependencia, params: ParamsDictionary) {
        try {
            const dependenciaUpdated =
                await this.DependenciaModel.findByIdAndUpdate(
                    { _id: params.id },
                    dependencia,
                    { new: true },
                )
            return dependenciaUpdated
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al intentar actualizar la dependencia: ${error}`,
            )
        }
    }
    async getAllDependencias(params: ParsedQs) {
        const { filter } = ParseParamsToObject(params)
        try {
            const dependencias = await this.DependenciaModel.find(filter)
            return dependencias
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al intentar obtener las dependencias: ${error}`,
            )
        }
    }
}

export default DependenciaService

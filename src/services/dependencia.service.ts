import type Dependencia from '../interfaces/Dependencia'
import type { Model } from 'mongoose'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

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
        const querys = new URLSearchParams(params as unknown as string)
        const type = querys.get('type')
        //@ts-ignore
        let filter = {}
        if (type !== null) {
            filter = { type }
        }

        try {
            const dependencias = await this.DependenciaModel.find(filter)
            return dependencias
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al intentar obtener las dependencias: ${error}`,
            )
        }
    }

    /* ACA VAMOS  A NECESITAR QUE LOS FILTROS SEAN DINAMICOS<>
  QUE LOS FIsLTROS PUEDAN FILTRAR POR TIPO <INTERIOR O CAPITAL>
  */
}

export default DependenciaService

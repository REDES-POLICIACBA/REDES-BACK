import type Dependencia from '../interfaces/Dependencia'
import type { Model } from 'mongoose'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { ParseParamsToObject } from '../func/ObjectKeys'
import { io } from '../app'

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
            io.emit('dependenciaActualizada', dependenciaUpdated)
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

    async getAllDependenciasQuerysFilters(params: ParsedQs) {
        const { filter } = ParseParamsToObject(params)
        const page = filter.page ? Number.parseInt(filter.page.toString()) : 1
        const pagination = {
            limit: 20,
            page: page,
        }

        const query = {}

        if (filter.linkType) {
            //@ts-ignore
            query.linkType = { $in: filter.linkType.split(';') }
        }

        if (filter.firewall) {
            //@ts-ignore
            query.firewall = { $in: filter.firewall.split(';') }
        }

        if (filter.ipAddress) {
            //@ts-ignore
            const ips = filter.ipAddress.split(';')
            //@ts-ignore
            query.$or = [
                { ipInside: { $in: ips } },
                { ipOutside: { $in: ips } },
            ]
        }

        if (filter._id) {
            //@ts-ignore
            query._id = filter._id
        }
        console.log(filter)
        try {
            const dependencias = await this.DependenciaModel.find(query)
                .skip((pagination.page - 1) * pagination.limit)
                .limit(pagination.limit)

            const totalDocuments =
                await this.DependenciaModel.countDocuments(query)
            const totalPages = Math.ceil(totalDocuments / pagination.limit)
            console.log(dependencias?.length)
            return {
                dependencias,
                totalPages,
                currentPage: pagination.page,
            }
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al intentar obtener las dependencias: ${error}`,
            )
        }
    }
}

export default DependenciaService

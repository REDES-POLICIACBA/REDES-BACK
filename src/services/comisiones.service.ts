import type ComisionesInterface from '../interfaces/Comisiones'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { Model } from 'mongoose'
import NotificationServices from './notification.service'
import User from '../models/user'
import Notificaciones from '../models/notificaciones'
import type { ParsedQs } from 'qs'
import { ParseParamsToObject } from '../func/ObjectKeys'
import UserServices from './user.service'
import type { ReqUser } from '../interfaces/User'
import { io } from '../app'

//@ts-ignore
const servicesExternos = new NotificationServices(Notificaciones, User)
//@ts-ignore
const servicesExternoUser = new UserServices(User)

class ComisionesService {
    public ComisionesModel: Model<ComisionesInterface>
    constructor(ComisionesModel: Model<ComisionesInterface>) {
        this.ComisionesModel = ComisionesModel
    }
    async create(data: ComisionesInterface) {
        const { groupJob, description } = data
        try {
            const newComision = await this.ComisionesModel.create(data)
            const users = await User.find({ _id: { $in: groupJob } }).select(
                'tokenFCM notification',
            )
            if (users.length > 0) {
                const fcmTokens = users.map((user) => user.tokenFCM)
                servicesExternos.notificationComisionUser(
                    //@ts-ignore
                    fcmTokens,
                    'SistemasRedes.InFo',
                    description,
                )
                const newNotification = {
                    title: 'Redes.InFo',
                    description: description ?? '',
                    isRead: false,
                    createdAt: new Date(),
                }

                const promises = users.map(async (user) => {
                    const notification =
                        await servicesExternos.createNotification(
                            newNotification,
                        )
                    const notificationId = notification._id
                    user?.notification?.push(notificationId)
                    await user.save()
                })
                await Promise.all(promises)
            }
            io.emit('nuevaComision', newComision)

            return newComision
        } catch (error) {
            throw new Error(
                `Ha ocurido un error al crear la comisión, intente nuevamente, ${error}`,
            )
        }
    }

    async getComisionesEnprogreso(userId: string) {
        try {
            const comisionesEnprogreso = await this.ComisionesModel.find({
                groupJob: { $in: [userId] },
                process: 'En progreso',
            })
            return comisionesEnprogreso
        } catch (_error) {
            throw new Error(
                'El usuario no existe o no tiene comisiones en progreso',
            )
        }
    }

    async update(
        data: ComisionesInterface,
        params: ParamsDictionary,
        user: ReqUser,
    ) {
        console.log('data', data)
        try {
            const comision = await this.ComisionesModel.findByIdAndUpdate(
                { _id: params.id },
                data,
                { new: true },
            )
            if (data.process === 'Terminada') {
                const admins = await servicesExternoUser.getAllAdmins()
                const fcmTokens = admins.map((admin) => admin.tokenFCM)
                servicesExternos.notificationComisionUser(
                    fcmTokens,
                    'Informe del servidor',
                    `La comision ${comision?.name} ha cambiado de estado por el usuario ${user.email}, ahora el estado de la comisión se encuentra ${comision?.process}`,
                )
            }
            io.emit('comisionActualizada', comision)
            return comision
        } catch (error) {
            throw new Error(
                `Ha ocurido un error al actualizar la comisión, intente nuevamente, ${error}`,
            )
        }
    }
    async delete(params: ParamsDictionary) {
        try {
            await this.ComisionesModel.findByIdAndDelete({ _id: params.id })
        } catch (error) {
            throw new Error(
                `Ha ocurido un error al eliminar la comisión, intente nuevamente, ${error}`,
            )
        }
    }

    async getAll(params?: ParsedQs, user?: ReqUser) {
        const { filter } = ParseParamsToObject(params as ParsedQs)

        const page = filter.page ? Number.parseInt(filter.page.toString()) : 1
        const pagination = {
            limit: 22,
            page: page,
        }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const queryFilter: any = {}

        if (filter.process) {
            queryFilter.process = filter.process
        }

        if (filter.type) {
            queryFilter.type = filter.type
        }

        if (filter.name) {
            queryFilter.name = { $regex: filter.name, $options: 'i' }
        }
        if (filter.date) {
            //@ts-ignore
            const startDate = new Date(filter.date)
            startDate.setUTCHours(0, 0, 0, 0)

            const endDate = new Date(startDate)
            endDate.setUTCHours(23, 59, 59, 999)

            queryFilter.date = {
                $gte: startDate,
                $lte: endDate,
            }
        }

        try {
            const totalDocuments =
                await this.ComisionesModel.countDocuments(queryFilter)
            const comisionesEnprogreso = await this.ComisionesModel.find({
                groupJob: { $in: [user] },
                process: 'En progreso',
            }).populate({
                path: 'groupJob',
                select: 'email photo _id name',
            })

            const comisiones = await this.ComisionesModel.find(queryFilter)
                .skip((pagination.page - 1) * pagination.limit)
                .limit(pagination.limit)
                .populate({
                    path: 'groupJob',
                    select: 'email photo _id name',
                })
                .sort({ createdAt: -1 })

            const totalPages = Math.ceil(totalDocuments / pagination.limit)
            return {
                comisiones,
                totalDocuments: totalDocuments,
                totalPages,
                comisionesEnprogreso,
            }
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al obtener las comisiones, intente nuevamente, ${error}`,
            )
        }
    }

    async asignarComision(
        comision: ComisionesInterface,
        params: ParamsDictionary,
    ) {
        try {
            const comisionDB = await this.ComisionesModel.findOne({
                _id: params.id,
            })
            if (comisionDB !== null) {
                const userExists = comisionDB.groupJob
                    .map((comision) => comision.toString())
                    .includes(comision.groupJob.toString())
                if (userExists) {
                    throw new Error('El usuario ya tiene asignada la comisión')
                }
                //@ts-ignore
                comisionDB.groupJob.push(comision.groupJob)
                comisionDB.process = 'En progreso'
                await comisionDB.save()
                return comisionDB
            }
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al asignar la comisión,  ${error}`,
            )
        }
    }

    async aplicarComision(
        paramsUser: ParamsDictionary,
        paramsComision: ParamsDictionary,
    ) {
        try {
            const comisionAplicada =
                await this.ComisionesModel.findByIdAndUpdate(
                    { _id: paramsComision },
                    {
                        $addToSet: { groupJob: paramsUser },
                        process: 'En progreso',
                    },
                    { new: true },
                )
            io.emit('comisionAplicada', comisionAplicada)
            return comisionAplicada
        } catch (_error) {
            console.log(_error)
            throw new Error(
                'Ha ocurrido un error al aplicar a la comisión, intenta nuevamente más tarde',
            )
        }
    }

    async desAplicarComision(
        paramsUser: ParamsDictionary,
        paramsComision: ParamsDictionary,
    ) {
        try {
            const comisionDesAplicada =
                await this.ComisionesModel.findByIdAndUpdate(
                    { _id: paramsComision },
                    {
                        $pull: { groupJob: paramsUser },
                    },
                    { new: true },
                )
            return comisionDesAplicada
        } catch (_error) {
            console.log(_error)
            throw new Error(
                'Ha ocurrido un error al aplicar a la comisión, intenta nuevamente más tarde',
            )
        }
    }
}
export default ComisionesService

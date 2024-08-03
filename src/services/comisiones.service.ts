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
                    'Redes.InFo',
                    description,
                )
                const newNotification = {
                    title: 'Redes.InFo',
                    description: description ?? '',
                    isRead: false,
                    createdAt: new Date(),
                }

                for (const user of users) {
                    const notification =
                        await servicesExternos.createNotification(
                            newNotification,
                        )
                    const notificationId = notification._id
                    user?.notification?.push(notificationId)
                    await user.save()
                }
            }
            return newComision
        } catch (error) {
            throw new Error(
                `Ha ocurido un error al crear la comisión, intente nuevamente, ${error}`,
            )
        }
    }
    async update(
        data: ComisionesInterface,
        params: ParamsDictionary,
        user: ReqUser,
    ) {
        try {
            const comision = await this.ComisionesModel.findByIdAndUpdate(
                { _id: params.id },
                data,
                { new: true },
            )
            if (data.process !== 'no asignada') {
                const admins = await servicesExternoUser.getAllAdmins()
                const fcmTokens = admins.map((admin) => admin.tokenFCM)
                servicesExternos.notificationComisionUser(
                    fcmTokens,
                    'Informe del servidor',
                    `La comision ${comision?.name} ha cambiado de estado por el usuario ${user.email}, ahora el estado de la comisión se encuentra ${comision?.process}`,
                )
            }
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

    async getAll(params?: ParsedQs) {
        const { filter } = ParseParamsToObject(params as ParsedQs)
        try {
            const comisiones = await this.ComisionesModel.find(filter)
            return comisiones
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
                comisionDB.process = 'en proceso'
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

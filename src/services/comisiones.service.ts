import type ComisionesInterface from '../interfaces/Comisiones'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { Model } from 'mongoose'
import NotificationServices from './notification.service'
import User from '../models/user'
import Notificaciones from '../models/notificaciones'
import type { ParsedQs } from 'qs'
import { ParseParamsToObject } from '../func/ObjectKeys'

//@ts-ignore
const servicesExternos = new NotificationServices(Notificaciones, User)

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
                    await servicesExternos.createNotification(newNotification)
                const notificationId = notification._id
                user?.notification?.push(notificationId)
                await user.save()
            }

            return newComision
        } catch (error) {
            throw new Error(
                `Ha ocurido un error al crear la comisión, intente nuevamente, ${error}`,
            )
        }
    }
    async update(data: ComisionesInterface, params: ParamsDictionary) {
        try {
            const comision = await this.ComisionesModel.findByIdAndUpdate(
                { _id: params.id },
                data,
                { new: true },
            )
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
}
export default ComisionesService

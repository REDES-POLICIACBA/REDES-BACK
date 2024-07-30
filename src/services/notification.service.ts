import admin from '../firebase/admin'
import type Notificaciones from '../interfaces/Notificaciones'
import type { Model } from 'mongoose'
import type UserInterface from '../interfaces/User'
import type { ParamsDictionary } from 'express-serve-static-core'

class NotificationServices {
    public NotificacionesModel: Model<Notificaciones>
    public UserModel: Model<UserInterface>

    constructor(
        NotificacionesModel: Model<Notificaciones>,
        UserModel: Model<UserInterface>,
    ) {
        this.NotificacionesModel = NotificacionesModel
        this.UserModel = UserModel
    }

    async notificationComisionUser(
        tokens: string[],
        title: string,
        body: string,
    ) {
        try {
            console.log('tokens', tokens)
            const message = {
                notification: {
                    title: title,
                    body: body,
                },
                tokens: tokens,
            }
            const response = await admin.messaging().sendMulticast(message)

            console.log('Successfully sent messages:', response)

            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    console.error(
                        `Error sending message to token ${tokens[idx]}:`,
                        resp.error,
                    )
                }
            })
        } catch (error) {
            console.error('Error sending messages:', error)
            throw error
        }
    }

    async createNotification(notificacion: Notificaciones) {
        try {
            const newnotification =
                await this.NotificacionesModel.create(notificacion)
            return newnotification
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al crear la notificación, ${error}`,
            )
        }
    }

    async updateNotification(params: ParamsDictionary) {
        try {
            const { id } = params
            const notification =
                await this.NotificacionesModel.findOneAndUpdate(
                    { _id: id },
                    { isRead: true },
                    { new: true },
                )
            return notification
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al dar por leida la notificación, ${error}`,
            )
        }
    }
}

export default NotificationServices

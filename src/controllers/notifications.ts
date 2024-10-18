import type { Request, Response } from 'express'
import { response } from '../res/Response'
import NotificationServices from '../services/notification.service'
import type CustomError from '../interfaces/CustomError'
import Notificaciones from '../models/notificaciones'
import User from '../models/user'

//@ts-ignore
const service = new NotificationServices(Notificaciones, User)

const notificationController = {
    async notificationIsRead(req: Request, res: Response) {
        try {
            const notification = await service.updateNotification(req.params)
            response.isOk(res, 200, 'Notificación actualizada correctamente', {
                notification,
            })
        } catch (error) {
            response.isError(res, 500, error as CustomError, 'notification')
        }
    },
    async deleteNotification(req: Request, res: Response) {
        try {
            const notificationDelete = await service.deleteNotification(
                //@ts-ignore
                req.user,
                req.params,
            )
            console.log('aca', notificationDelete)
            response.isOk(res, 200, 'Notificación eliminada correctamente', {
                notification: notificationDelete,
            })
        } catch (error) {
            response.isError(res, 400, error as CustomError, 'notification')
        }
    },
}

export default notificationController

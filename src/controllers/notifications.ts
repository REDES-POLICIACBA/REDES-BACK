import type { Request, Response } from 'express'
import { response } from '../res/Response'
import NotificationServices from '../services/notification.service'
import type CustomError from '../interfaces/CustomError'
import Notificaciones from '../models/notificaciones'
import User from '../models/user'

//@ts-ignore
const service = new NotificationServices(Notificaciones, User)

const notificationController = {
    /* async notificationComision(_req: Request, res: Response) {
  try {
    await service.sendNotification(
      'token',
      'Comisión',
      'Tienes una nueva comisión',
    )
    response.isOk(res, 200, 'Notificación enviada correctamente')
  } catch (error) {
    response.isError(res, 500, error as CustomError, 'notification')
  }
}, */

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
}

export default notificationController

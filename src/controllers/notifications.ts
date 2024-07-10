import type { Request, Response } from 'express'
import { response } from '../res/Response'
import NotificationServices from '../services/notification.service'
import type CustomError from '../interfaces/CustomError'

/* const service = new NotificationServices() */

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
}

export default notificationController

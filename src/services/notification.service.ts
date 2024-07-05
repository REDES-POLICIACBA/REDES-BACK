import admin from 'firebase-admin'
import cron from 'node-cron'
const serviceAccount = require('./config/redes.firebase.sdk.json')

class NotificationServices {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  }

  setupCronJobs() {
    // Notificaciones diarias a las 20:30
    cron.schedule('30 20 * * *', () => {
      console.log('Enviando notificaciones diarias...')
    })

    // Notificaciones mensuales el día 25 a las 09:00
    cron.schedule('0 9 25 * *', () => {
      console.log('Enviando notificaciones mensuales...')
    })
  }

  //@ts-ignore
  async sendNotification(token, title, body) {
    const message = {
      notification: {
        title: title || 'Notificación',
        body: body || 'Tienes una nueva notificación',
      },
      token: token,
    }

    try {
      const response = await admin.messaging().send(message)
      console.log('Notification sent successfully:', response)
    } catch (error) {
      console.error('Error sending notification:', error)
    }
  }
}

export default NotificationServices

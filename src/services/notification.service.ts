import admin from '../firebase/admin'

class NotificationServices {
    async notificationComisionUser(token: string, title: string, body: string) {
        const message = {
            notification: {
                title: title,
                body: body,
            },
            token: token,
        }
        try {
            const response = await admin.messaging().send(message)
            console.log('Successfully sent message:', response)
        } catch (error) {
            return error
        }
    }
}

export default NotificationServices

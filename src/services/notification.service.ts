import type { Types } from 'mongoose'
import admin from '../firebase/admin'

class NotificationServices {
    async notificationComisionUser(
        tokens: string[],
        title: string,
        body: string,
    ) {
        try {
            const messages = tokens.map((token) => ({
                notification: {
                    title: title,
                    body: body,
                },
                token: token,
            }))
            const dryRun = false
            //@ts-ignore
            const response = await admin.messaging().sendEach(messages, dryRun)
            console.log('Successfully sent messages:', response)
        } catch (error) {
            console.log('Error sending message:', error)
            return error
        }
    }
}

export default NotificationServices

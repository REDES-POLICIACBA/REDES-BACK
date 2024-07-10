import type { Types } from 'mongoose'
import admin from '../firebase/admin'

class NotificationServices {
    async notificationComisionUser(
        tokens: Array<Types.ObjectId>,
        title: string,
        body: string,
        dryRun: boolean,
    ) {
        const messages = tokens.map((token) => ({
            notification: {
                title: title,
                body: body,
            },
            token: token.toString(),
        }))
        try {
            const response = await admin.messaging().sendEach(messages, dryRun)
            console.log('Push Notification Succesfull:', response)
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

export default NotificationServices

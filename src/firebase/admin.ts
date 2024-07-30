import admin from 'firebase-admin'

const serviceAccount = require('./redespushnotifications-firebase-adminsdk-znk8m-17b007cf6a.json')

admin.initializeApp({
    //@ts-ignore
    credential: admin.credential.cert(serviceAccount),
})

export default admin

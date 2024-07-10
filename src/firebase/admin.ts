import admin from 'firebase-admin'
import { credentialSDK } from '../config/credentialSDK'

const serviceAccount = credentialSDK()

admin.initializeApp({
    //@ts-ignore
    credential: admin.credential.cert(serviceAccount),
})

export default admin

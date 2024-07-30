export const credentialSDK = () => {
    return {
        type: 'service_account',
        project_id: 'redespushnotifications',
        private_key_id: process.env.PRIVATE_KEY_ID,
        //@ts-ignore
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.CLIENT_EMAIL,
        client_id: '106393420163014024141',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url:
            'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url:
            'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-znk8m%40redespushnotifications.iam.gserviceaccount.com',
        universe_domain: 'googleapis.com',
    }
}

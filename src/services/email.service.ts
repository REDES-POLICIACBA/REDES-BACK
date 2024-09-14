import { createTransport } from 'nodemailer'
import 'dotenv/config'

interface Props {
    html: string
    email: string
    subject?: string
    text?: string
    username?: string
}

class EmailServices {
    async sendEmail(data: Props) {
        const { html, email, subject, text } = data
        const message = {
            from: process.env.USEREMAIL,
            to: email,
            subject: subject,
            text: text,
            html: html,
        }

        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USEREMAIL,
                pass: process.env.USERMAILPASSWORD,
            },
        })

        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log(error)
            } else {
                console.log('email to:', info.response)
            }
        })
    }
}
export default EmailServices

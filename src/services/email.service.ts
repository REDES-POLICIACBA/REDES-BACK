import { createTransport } from 'nodemailer'
import crypto from 'node:crypto'
import sendEmailConfirmation from '../html/senEmailConfirmationAccount'

class EmailServices {
  async sendEmailConfirmationAccount(
    email: string,
    verifiedCode: string,
  ): Promise<void> {
    const message = {
      from: process.env.USEREMAIL,
      to: email,
      subject: 'Recuperar contraseña',
      text: 'Porfavor copía el código que te hemos enviado.',
      html: sendEmailConfirmation(email, verifiedCode),
    }

    const transporter = createTransport({
      service: 'gmail',
      auth: {
        /* aca faltan DECLARAS LAS VARIABLES DE ENTORNO */
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
  async sendPartesdeTrabajo() {}
  async sendResetPassword() {}
}
export default EmailServices

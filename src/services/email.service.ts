import { createTransport } from 'nodemailer'

interface Props {
  html: string
  email: string
  subject: string
  text: string
}

class EmailServices {
  async sendEmailConfirmationAccount(data: Props) {
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
}
export default EmailServices

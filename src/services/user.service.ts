import crypto from 'node:crypto'
import bcryptjs from 'bcryptjs'
import type UserInterface from '../interfaces/User'
import type { Model } from 'mongoose'
import type { ParamsDictionary } from 'express-serve-static-core'
import EmailServices from './email.service'
import sendEmailConfirmation from '../html/senEmailConfirmationAccount'

const emailServices = new EmailServices()

class UserServices {
  public UserModel: Model<UserInterface>
  constructor(UserModel: Model<UserInterface>) {
    this.UserModel = UserModel
  }

  async createUser(user: UserInterface) {
    user.role = 0
    user.photo =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBgubqzveGfonqnt4XHQEuglmkeHwfzfSInQ&s'
    user.password = bcryptjs.hashSync(user.password, 10)
    user.verifiedCode = crypto.randomBytes(20).toString('hex')
    try {
      const createUser = await this.UserModel.create(user)
      const data = {
        html: sendEmailConfirmation(user.name),
        email: user.email,
        subject: 'Confirmación de cuenta',
        text: 'Confirma tu cuenta',
      }
      emailServices.sendEmailConfirmationAccount(data).then(() => {
        console.log(`Email enviado a ${user.email}`)
      })
      return createUser
    } catch (error) {
      throw new Error(`Ha ocurrido un error al crear el usuario, ${error}`)
    }
  }

  async updateUser(user: UserInterface, params: ParamsDictionary) {
    try {
      const userUpdate = await this.UserModel.findOneAndUpdate(
        { _id: params.id },
        user,
        { new: true },
      )
      return userUpdate
    } catch (error) {
      throw new Error(`Ha ocurrido un error al actualizar el usuario, ${error}`)
    }
  }
  async deleteUser(params: ParamsDictionary) {
    try {
      return await this.UserModel.findOneAndDelete({ _id: params.id })
    } catch (error) {
      throw new Error(`Ha ocurrido un error al eliminar el usuario, ${error}`)
    }
  }

  async changePasswordUser(user: UserInterface) {
    const { email, password } = user
    try {
      const newHashPass = bcryptjs.hashSync(password, 10)
      const userFind = await this.UserModel.findOneAndUpdate(
        { email: email },
        { password: newHashPass },
        { new: true },
      )
      return userFind
    } catch (error) {
      throw new Error(`Ha ocurrido un error al cambiar la contraseña, ${error}`)
    }
  }
}

export default UserServices

import crypto from 'node:crypto'
import bcrypt from 'bcryptjs'
import type UserInterface from '../interfaces/User'

class UserServices {
  UserModel: UserInterface
  constructor(UserModel: UserInterface) {
    this.UserModel = UserModel
  }
  async createUser(user: UserInterface) {
    user.role = 0
    user.photo =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBgubqzveGfonqnt4XHQEuglmkeHwfzfSInQ&s'
    user.password = bcrypt.hashSync(user.password, 10)
    user.verifiedCode = crypto.randomBytes(20).toString('hex')
    try {
      //@ts-ignore
      return await this.UserModel.create(user)
    } catch (error) {
      console.log(error)
      throw new Error(`Ha ocurrido un error al crear el usuario, ${error}`)
    }
  }

  /* async updateUser() {
    try {

    } catch (error) {

    }
  }
  async getUsers() { } */
}

export default UserServices

import type UserInterface from '../interfaces/User'

class UserServices {
  UserModel: UserInterface
  constructor(UserModel: UserInterface) {
    this.UserModel = UserModel
  }
  async createUser(_user: UserInterface) {
    try {
      //@ts-ignore
      return await this.UserModel.create(user)
    } catch (error) {
      throw new Error(`Ha ocurrido un error al crear el usuario, ${error}`)
    }
  }

  async updateUser() {}
  async getUsers() {}
}

export default UserServices

import UserServices from '../services/user.service'
import User from '../models/user'
import type UserInterface from '../interfaces/User'

const services = new UserServices(User as unknown as UserInterface)

export const userController = {
  async createUser(req: Request, _res: Response) {
    try {
      // @ts-ignore
      await services.createUser(req.body)
    } catch (error) {
      return error
    }
  },
}

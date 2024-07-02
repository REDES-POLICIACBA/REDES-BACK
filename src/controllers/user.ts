import UserServices from '../services/user.service'
import User from '../models/user'
import type { Request, Response } from 'express'
import { response } from '../res/Response'
import type CustomError from '../interfaces/CustomError'

//@ts-ignore
const services = new UserServices(User)

export const userController = {
  async createUser(req: Request, res: Response) {
    try {
      await services.createUser(req.body)
      response.isOk(res, 201, 'Usuario creado correctamente')
    } catch (error) {
      response.isError(res, 500, error as CustomError, 'user')
    }
  },
}

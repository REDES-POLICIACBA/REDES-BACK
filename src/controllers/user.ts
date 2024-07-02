import UserServices from '../services/user.service'
import User from '../models/user'
import type { Request, Response } from 'express'
import type UserInterface from '../interfaces/User'
import { response } from '../res/Response'
import type CustomError from '../interfaces/CustomError'

const services = new UserServices(User as unknown as UserInterface)

export const userController = {
  async createUser(req: Request, res: Response) {
    try {
      // @ts-ignore
      await services.createUser(req.body)
      response.isOk(res, 201, 'Usuario creado correctamente')
    } catch (error) {
      console.log(error)
      response.isError(res, 500, error as CustomError, 'user')
    }
  },
}

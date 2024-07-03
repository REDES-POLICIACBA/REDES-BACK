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
  async updateUser(req: Request, res: Response) {
    try {
      const { body, params } = req
      await services.updateUser(body, params)
      response.isOk(res, 200, 'Usuario actualizado correctamente')
    } catch (error) {
      response.isError(res, 500, error as CustomError, 'user')
    }
  },
  async deleteUser(req: Request, res: Response) {
    try {
      const { params } = req
      await services.deleteUser(params)
      response.isOk(res, 200, 'Usuario eliminado correctamente')
    } catch (error) {
      response.isError(res, 500, error as CustomError, 'user')
    }
  },
  async recoveryPassword(req: Request, res: Response) {
    try {
      await services.recoveryPassword(req.body)
      response.isOk(res, 200, 'Correo enviado correctamente')
    } catch (error) {
      response.isError(res, 500, error as CustomError, 'user')
    }
  },
}

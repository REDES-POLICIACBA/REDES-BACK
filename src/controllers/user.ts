import UserServices from '../services/user.service'
import User from '../models/user'
import type { Request, Response } from 'express'
import { response } from '../res/Response'
import type CustomError from '../interfaces/CustomError'
import { sign } from 'node:crypto'

//@ts-ignore
const services = new UserServices(User)

export const userController = {
    async createUser(req: Request, res: Response) {
        try {
            await services.createUser(req.body)
            response.isOk(res, 201, 'Usuario creado correctamente')
        } catch (error) {
            response.isError(res, 400, error as CustomError, 'user')
        }
    },
    async updateUser(req: Request, res: Response) {
        try {
            const { body, params } = req
            const user = await services.updateUser(body, params)
            response.isOk(res, 200, 'Usuario actualizado correctamente', {
                user,
            })
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
    async signIn(req: Request, res: Response) {
        try {
            const user = await services.signIn(req.body)
            response.isOk(res, 200, 'Usuario logueado correctamente', user)
        } catch (error) {
            response.isError(res, 400, error as CustomError, 'user')
        }
    },
    async signInToken(req: Request, res: Response) {
        try {
            //@ts-ignore
            const resp = await services.signInToken(req.user)
            const data = {
                token: resp.token,
                user: resp.userToken,
            }
            response.isOk(res, 200, 'Token recuperado correctamente', data)
        } catch (error) {
            response.isError(res, 500, error as CustomError, 'user')
        }
    },
    async getAllInstaladores(_req: Request, res: Response) {
        try {
            const users = await services.getAllInstaladores()
            response.isOk(res, 200, 'Instaladores recuperados correctamente', {
                users,
            })
        } catch (error) {
            response.isError(res, 400, error as CustomError, 'user')
        }
    },
    async signOut(req: Request, res: Response) {
        try {
            //@ts-ignore
            await services.signOut(req.user)
            response.isOk(res, 200, 'Usuario desconectado correctamente')
        } catch (error) {
            response.isError(res, 400, error as CustomError, 'user')
        }
    },
    async updateFCMToken(req: Request, _res: Response) {
        try {
            await services.updateFCMToken(req.params, req.body.token)
        } catch (error) {
            console.log(error)
        }
    },
    async authGoogle(req: Request, res: Response) {
        try {
            console.log(req.body)
            const { idToken, tokenFCM } = req.body
            const user = await services.authGoogle(idToken, tokenFCM)
            response.isOk(res, 200, 'Usuario logueado correctamente', user)
        } catch (error) {
            response.isError(res, 400, error as CustomError, 'user')
        }
    },
    async verifyCode(req: Request, res: Response) {
        try {
            const { email, verifyCode } = req.body
            const user = await services.verfyCode(email, verifyCode)
            response.isOk(res, 200, 'Código procesado correctamente', user)
        } catch (error) {
            response.isError(res, 400, error as CustomError, 'user')
        }
    },
    async getNotifications(req: Request, res: Response) {
        try {
            const notifications = await services.getNotifications(req.params)
            response.isOk(
                res,
                200,
                'Notificaciones recuperadas correctamente',
                {
                    notifications,
                },
            )
        } catch (error) {
            response.isError(res, 400, error as CustomError, 'user')
        }
    },
    async changePassword(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            await services.changePassword(email, password)
            response.isOk(res, 200, 'Contraseña cambiada correctamente')
        } catch (error) {
            console.log(error)
            response.isError(res, 400, error as CustomError, 'user')
        }
    },
}

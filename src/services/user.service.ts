import crypto from 'node:crypto'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type UserInterface from '../interfaces/User'
import type { Model } from 'mongoose'
import type { ParamsDictionary } from 'express-serve-static-core'
import EmailServices from './email.service'
import sendEmailConfirmation from '../html/senEmailConfirmationAccount'
import sendResetPassword from '../html/sendResetPassword'
import { OAuth2Client } from 'google-auth-library'
import 'dotenv/config'

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
            emailServices.sendEmail(data).then(() => {
                console.log(`Email enviado a ${user.email}`)
            })
            return createUser
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al crear el usuario, ${error}`,
            )
        }
    }

    async signIn(user: UserInterface) {
        const { email, tokenFCM } = user
        const SECRET = <string>process.env.SECRET
        try {
            const userFind = await this.UserModel.findOneAndUpdate(
                { email },
                { isOnline: true, tokenFCM },
                { new: true },
            ).populate('notification', '-updatedAt -__v')
            if (userFind !== null) {
                const token = jwt.sign({ id: userFind._id }, SECRET, {
                    expiresIn: '1h',
                })
                return {
                    token,
                    user: {
                        name: userFind.name,
                        email: userFind.email,
                        role: userFind.role,
                        photo: userFind.photo,
                        _id: userFind._id,
                        notifications: userFind.notification,
                        latestConnection: userFind.latestConnection,
                    },
                }
            }
        } catch (error) {
            throw new Error(`Ha ocurrido un error al iniciar sesión, ${error}`)
        }
    }

    async signInToken(user: UserInterface) {
        try {
            const token = jwt.sign(
                { id: user._id },
                <string>process.env.SECRET,
                {
                    expiresIn: '1h',
                },
            )
            //@ts-ignore
            const userToken = {
                name: user.name,
                email: user.email,
                role: user.role,
                photo: user.photo,
                isOnline: user.isOnline,
                isVerified: user.isVerified,
            }
            return {
                token,
                userToken,
            }
        } catch (error) {
            throw new Error(`No se ha podido decodificar el token${error}`)
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
            throw new Error(
                `Ha ocurrido un error al actualizar el usuario, ${error}`,
            )
        }
    }

    async deleteUser(params: ParamsDictionary) {
        try {
            return await this.UserModel.findOneAndDelete({ _id: params.id })
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al eliminar el usuario, ${error}`,
            )
        }
    }
    async changePassword(user: UserInterface, password: string) {
        try {
            const newHashPass = bcryptjs.hashSync(password, 10)
            const userFind = await this.UserModel.findOneAndUpdate(
                { email: user.email },
                { password: newHashPass },
                { new: true },
            )
            return userFind
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al cambiar la contraseña, ${error}`,
            )
        }
    }

    async recoveryPassword(user: UserInterface) {
        const { email, name } = user
        try {
            const userFind = await this.UserModel.findOne({ email: email })
            if (!userFind) {
                throw new Error('Usuario no encontrado en la base de datos')
            }
            const newVerifyCode = crypto.randomBytes(20).toString('hex')
            userFind.verifiedCode = newVerifyCode
            await userFind.save()
            const data = {
                html: sendResetPassword(newVerifyCode, userFind.name),
                email: userFind.email,
                subject: 'Recuperación de contraseña',
                text: 'Recupera tu contraseña',
                username: name,
            }
            emailServices.sendEmail(data).then(() => {
                console.log(
                    `Email de recuperación de clave enviado a ${userFind.email}`,
                )
            })
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al recuperar la contraseña, ${error}`,
            )
        }
    }

    async verfyCode(email: string, verifyCode: string) {
        try {
            const user = await this.UserModel.findOne<UserInterface>({ email })
            if (user !== null) {
                if (verifyCode === user.verifiedCode) {
                    return {
                        user: {
                            name: user.name,
                            email: user.email,
                            photo: user.photo,
                        },
                    }
                }
                throw new Error('Error al encontrar el Usuario ')
            }
        } catch (_error) {
            throw new Error(
                'el código que has ingresado no es el correcto, verifica el código nuevamente',
            )
        }
    }

    async getAllInstaladores() {
        try {
            const users = await this.UserModel.find({
                role: { $in: [0, 1, 2] },
            }).select('_id name email photo role')
            return users
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al obtener los instaladores, ${error}`,
            )
        }
    }
    async getAllAdmins() {
        try {
            const users = await this.UserModel.find({ role: 3 }).select(
                '_id name email tokenFCM',
            )
            return users
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al obtener los administradores, ${error}`,
            )
        }
    }

    async signOut(user: UserInterface) {
        try {
            const userFind = await this.UserModel.findOneAndUpdate(
                { email: user.email },
                { isOnline: false, latestConnection: new Date() },
                { new: true },
            )
            return userFind
        } catch (error) {
            throw new Error(`Ha ocurrido un error al cerrar sesión, ${error}`)
        }
    }

    async updateFCMToken(params: ParamsDictionary, tokenFCM: string) {
        try {
            const userUpdate = await this.UserModel.findOneAndUpdate(
                { _id: params.id },
                { tokenFCM },
                { new: true },
            )
            return userUpdate
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al actualizar el usuario, ${error}`,
            )
        }
    }

    async authGoogle(idToken: string, tokenFCM: string) {
        try {
            const SECRET = process.env.SECRET as string
            const clientID = process.env.GOOGLE_CLIENT_ID as string
            const client = new OAuth2Client(clientID)

            const ticket = await client.verifyIdToken({
                idToken,
                audience: clientID,
            })
            console.log(ticket)
            const payload = ticket.getPayload()
            if (!payload) {
                throw new Error('No se pudo obtener el payload del token.')
            }

            const email = payload.email
            const pass = payload.sub
            if (!email) {
                throw new Error('El token no contiene un email válido.')
            }
            let user = await this.UserModel.findOne({ email }).populate(
                'notification',
                '-updatedAt -__v',
            )

            if (user) {
                user.isOnline = true
                user.tokenFCM = tokenFCM
                await user.save()
            } else {
                user = await this.UserModel.create({
                    email,
                    name: payload.name,
                    photo: payload.picture,
                    role: 0,
                    isOnline: true,
                    tokenFCM,
                    password: bcryptjs.hashSync(pass, 10),
                    verifiedCode: crypto.randomBytes(20).toString('hex'),
                })
                await user.save()
            }
            const token = jwt.sign({ id: user._id }, SECRET, {
                expiresIn: '1h',
            })
            return {
                token,
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    photo: user.photo,
                    _id: user._id,
                    isOnline: user.isOnline,
                    notifications: user.notification,
                    latestConnection: user.latestConnection,
                },
            }
        } catch (_error) {
            console.log(_error)
            throw new Error('Error en la autenticación de Google.')
        }
    }

    async getNotifications(params: ParamsDictionary) {
        try {
            const user = await this.UserModel.findOne({
                _id: params.id,
            }).populate('notification', '-updatedAt -__v')
            //@ts-ignore
            return user.notification
        } catch (_error) {
            throw new Error(
                'Ha ocurrido un error al obtener las notificaciones',
            )
        }
    }
}
export default UserServices

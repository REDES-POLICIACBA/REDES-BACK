import crypto from 'node:crypto'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type UserInterface from '../interfaces/User'
import type { Model } from 'mongoose'
import type { ParamsDictionary } from 'express-serve-static-core'
import EmailServices from './email.service'
import sendEmailConfirmation from '../html/senEmailConfirmationAccount'
import sendResetPassword from '../html/sendResetPassword'

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
            )
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
                    },
                }
            }
        } catch (error) {
            throw new Error(`Ha ocurrido un error al iniciar sesión, ${error}`)
        }
    }

    async signInToken(user: UserInterface) {
        try {
            console.log(user)
            const token = jwt.sign(
                { id: user._id },
                <string>process.env.SECRET,
                {
                    expiresIn: 60 * 60 * 2,
                },
            )
            console.log(token)
            return {
                token,
                user,
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
                html: sendResetPassword(newVerifyCode, user.name),
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
}

export default UserServices

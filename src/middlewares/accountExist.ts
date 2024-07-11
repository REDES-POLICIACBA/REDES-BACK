import type { NextFunction, Request, Response } from 'express'
import User from '../models/user'

async function accountExist(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            // @ts-ignore
            req.user = {
                id: user._id,
                email: user.email,
                photo: user.photo,
                password: user.password,
                role: user.role,
                isVerified: user.isVerified,
            }
            return next()
        }
        if (!user) {
            return res.status(400).json({
                success: false,
                message: [
                    {
                        path: 'user',
                        message:
                            'No se encuentra el usuario en la base de datos',
                    },
                ],
            })
        }
    } catch (_error) {
        return res.status(400).json({
            success: false,
            message: [
                {
                    path: 'credenciales',
                    message: 'Los datos ingresados no son correctos',
                },
            ],
        })
    }
}
export default accountExist

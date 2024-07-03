import type { NextFunction, Request, Response } from 'express'
import User from '../models/user'
import type { Types } from 'mongoose'

interface CustomRequest extends Request {
  user: {
    id: Types.ObjectId
    email: string
    photo: string
    password: string
    role: number
    isVerified: boolean
  }
}

async function accountExist(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
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
            message: 'No se encuentra el usuario en la base de datos',
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

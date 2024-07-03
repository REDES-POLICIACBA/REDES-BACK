import bcryptjs from 'bcryptjs'
import type { NextFunction, Request, Response } from 'express'

interface CustomRequest extends Request {
  user: {
    password: string
  }
}

function passwordIsOk(req: CustomRequest, res: Response, next: NextFunction) {
  const dbPass = req.user.password
  const formPass = req.body.password

  if (bcryptjs.compareSync(formPass, dbPass)) {
    return next()
  }
  return res.status(400).json({
    success: false,
    message: [
      {
        path: 'credential',
        message: 'La contraseña o el usuario son incorrectas',
      },
    ],
  })
}
export default passwordIsOk

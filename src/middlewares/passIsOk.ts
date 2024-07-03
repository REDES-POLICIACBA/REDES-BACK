import bcryptjs from 'bcryptjs'
import type { NextFunction, Request, Response } from 'express'

function passwordIsOk(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
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

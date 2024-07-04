import type { NextFunction, Request, Response } from 'express'

async function isVerified(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if (req.user.isVerified) {
    return next()
  }

  return res.status(400).json({
    success: false,
    message: [
      {
        path: 'verified',
        message: 'El usuario no ha sido verificado por el Administrador',
      },
    ],
  })
}

export default isVerified

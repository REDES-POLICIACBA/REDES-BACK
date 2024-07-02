import type { Response } from 'express'

export const response = {
  isOk: (cod: number, res: Response, message: string) => {
    return res.status(cod).json({
      status: true,
      message: message,
    })
  },
  isError: (cod: number, res: Response, message: string, path: string) => {
    return res.status(cod).json({
      status: false,
      message: [
        {
          path: path,
          message: message,
        },
      ],
    })
  },
}

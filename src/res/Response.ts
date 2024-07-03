import type { Response } from 'express'
import type CustomError from '../interfaces/CustomError'

export const response = {
  isOk: (res: Response, cod: number, message: string, object?: object) => {
    return res.status(cod).json({
      status: true,
      message: message,
      ...object,
    })
  },
  isError: (res: Response, cod: number, error: CustomError, path: string) => {
    return res.status(cod).json({
      status: false,
      message: [
        {
          path: path,
          message: error.message,
        },
      ],
    })
  },
}

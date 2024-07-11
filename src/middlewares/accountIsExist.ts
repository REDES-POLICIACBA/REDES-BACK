import User from '../models/user'

import type { NextFunction, Request, Response } from 'express'

async function accountIsExist(req: Request, res: Response, next: NextFunction) {
    try {
        const accounExistd = await User.findOne({ email: req.body.email })
        if (accounExistd) {
            return res.status(400).json({
                success: false,
                message: `El correo ${req.body.email} ya esta registrado en la base de datos`,
            })
        }
        next()
    } catch (_error) {}
}

export default accountIsExist

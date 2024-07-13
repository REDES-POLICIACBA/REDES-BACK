import type { NextFunction, Response, Request } from 'express'

interface User {
    role: number
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const { role } = <User>req.user
    console.log(role)
    try {
        if (role !== 3) {
            return res.status(401).json({
                message: 'No tienes permisos para realizar esta acción',
            })
        }
        next()
    } catch (_error) {}
}

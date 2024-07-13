import type { NextFunction, Response, Request } from 'express'

interface User {
    role: number
}

export async function isInstalador(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { role } = <User>req.user
    console.log(role)
    try {
        if (role === 1 || role === 3) {
            return next()
        }
        return res.status(401).json({
            message:
                'Debes tener un rol de Instalador para realizar esta acción',
        })
    } catch (_error) {}
}

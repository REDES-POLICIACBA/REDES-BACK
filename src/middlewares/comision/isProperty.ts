import type { NextFunction, Response, Request } from 'express'
import Comisiones from '../../models/comisiones'

export async function isProperty(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const { id } = req.params
        const comision = await Comisiones.findById(id)
        if (
            //@ts-ignore
            comision?.groupJob.includes(req.user?._id) ||
            //@ts-ignore
            req.user?.role === 'admin'
        ) {
            return next()
        }
        return res.status(401).json({
            success: false,
            message: 'No has sido asignado a esta comisión',
        })
    } catch (_error) {}
}

import type { NextFunction, Response, Request } from 'express'
import Comisiones from '../../models/comisiones'
import type { ReqUser } from '../../interfaces/User'

export async function isApplyComision(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const { id } = req.params
        const { _id } = <ReqUser>req.user
        const isApply = await Comisiones.findOne({ _id: id })
        //@ts-ignore
        if (
            isApply?.groupJob.find((user) => user.toString() === _id.toString())
        ) {
            return res.status(400).json({
                success: false,
                message: 'Ya has aplicado a esta comisión',
            })
        }
        return next()
    } catch (_error) {}
}

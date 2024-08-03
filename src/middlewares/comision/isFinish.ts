import type { Request, Response, NextFunction } from 'express'
import Comisiones from '../../models/comisiones'

export async function isFinish(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { id } = req.params

    console.log('id del params en el middleware de isFinish', id)
    try {
        const comisionEncontrada = await Comisiones.findById(id)
        if (comisionEncontrada?.process === 'Terminada') {
            return res.status(400).json({
                message: 'La comisión ya ha sido finalizada',
            })
        }
        return next()
    } catch (_error) {}
}

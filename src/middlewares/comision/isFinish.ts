import type { Request, Response } from 'express'
import Comisiones from '../../models/comisiones'

export async function isFinish(req: Request, res: Response) {
    const { idComision } = req.params
    try {
        const comisionEncontrada = await Comisiones.findById(idComision)
        if (comisionEncontrada?.process === 'terminada') {
            return res.status(400).json({
                message: 'La comisión ya ha sido finalizada',
            })
        }
    } catch (_error) {}
}

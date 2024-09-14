import type { Request, Response, NextFunction } from 'express'

export async function alreadyUsers(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const { groupJob, process } = req.body
        if (process === 'No asignada' && groupJob.length > 0) {
            return res.status(400).json({
                message:
                    "La comisión tiene usuarios asignados, por favor cambie el estado a 'En progreso'",
            })
        }
        return next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}

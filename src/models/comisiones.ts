import mongoose, { Types } from 'mongoose'

const validOption = [
    'En progreso',
    'Terminada',
    'Cancelada',
    'Reprogramada',
    'No asignada',
]
const validType = ['instalación', 'reparación', 'mantenimiento', 'otro']

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        date: { type: Date, required: false },
        process: { type: String, enum: validOption, default: 'no asignada' },
        description: { type: String, required: true },
        type: { type: String, enum: validType, required: true },
        groupJob: [{ type: Types.ObjectId, ref: 'users', required: false }],
        schedule: { type: String, required: true },
        timeJob: { type: Number, default: 0 },
        timeJourney: { type: Number, default: 0 },
        observation: { type: String, required: false },
    },
    { timestamps: true },
)
const collection = 'comisiones'
const Comisiones = mongoose.model(collection, schema)

export default Comisiones

/*  ACA VAMOS  ANECESITAR QUE EL MODELO CONTENGA DENTRO DE SI MISMO LA CAPACIDAD DE FILTRAR POR TIPO DE PROBLEMA RESUELTO O ASUNTO, QUE DIRECCION POLICIAL FUE EL EQUIPO DE TRABAJO (ESTE CAMPO SEA OBLIGATORIO) */

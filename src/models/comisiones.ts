import mongoose, { Types } from 'mongoose'

const validOption = [
    'en proceso',
    'terminada',
    'cancelada',
    'reprogramada',
    'no asignada',
]
const validType = ['instalacion', 'reparacion', 'mantenimiento', 'otro']

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        date: { type: Date, required: false },
        process: { type: String, enum: validOption, default: 'no asignada' },
        type: { type: String, enum: validType, required: true },
        groupJob: [{ type: Types.ObjectId, ref: 'users', required: false }],
        schedule: { type: String, required: true },
        timeJob: { type: Number, default: 0 },
        timeJourney: { type: Number, default: 0 },
    },
    { timestamps: true },
)
const collection = 'comisiones'
const Comisiones = mongoose.model(collection, schema)

export default Comisiones

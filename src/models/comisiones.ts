import mongoose, { Types } from 'mongoose'

const validOption = ['en proceso', 'terminada', 'cancelada']

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    process: { type: String, enum: validOption, required: true },
    groupJob: [{ type: Types.ObjectId, ref: 'users', required: true }],
    schedule: { type: String, required: true },
    timeJob: { type: Number, required: true },
    timeJourney: { type: Number, required: true },
  },
  { timestamps: true },
)
const collection = 'comisiones'
const Comisiones = mongoose.model(collection, schema)

export default Comisiones

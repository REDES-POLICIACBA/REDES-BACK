import mongoose, { Types } from "mongoose";

const validOption = ["en proceso", "terminada", "cancelada"]

const schema = new mongoose.Schema({
    nombre: { type: String, required: true },
    dia: { type: String, required: true },
    proceso: { type: String, enum: validOption, required: true },
    grupodeTrabajo: [{ type: Types.ObjectId, ref: "users", required: true }],
    horario: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})
const collection = "comisiones"
const Comisiones = mongoose.model(collection, schema)
export default Comisiones;


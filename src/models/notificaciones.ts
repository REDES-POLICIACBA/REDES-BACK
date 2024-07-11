import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    },
)

const collection = 'notifications'
const Notificaciones = mongoose.model(collection, schema)
export default Notificaciones

import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    },
    {
        timestamps: true,
    },
)

const collection = 'notificaciones'
const Notificaciones = mongoose.model(collection, schema)
export default Notificaciones

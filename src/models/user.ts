import mongoose, { Types } from 'mongoose'

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now },
        isOnline: { type: Boolean, default: false },
        photo: { type: String },
        dateBirth: { type: Date },
        isVerified: { type: Boolean, default: false },
        verifiedCode: { type: String },
        notification: [
            { type: Types.ObjectId, ref: 'notifications', default: [] },
        ],
        tokenFCM: { type: String },
    },
    { timestamps: true },
)

const collection = 'users'
const User = mongoose.model(collection, schema)

export default User

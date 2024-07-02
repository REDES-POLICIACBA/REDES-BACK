import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    isOnline: { type: Boolean, default: false },
    photo: { type: String, required: true },
    dateBirth: { type: Date },
    isVerified: { type: Boolean, default: false },
    verifiedCode: { type: String },
  },
  { timestamps: true },
)

const collection = 'users'
const User = mongoose.model(collection, schema)

export default User

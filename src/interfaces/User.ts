import type { Types } from 'mongoose'

export default interface UserInterface {
    name: string
    email: string
    password: string
    role: number
    createdAt: Date
    isOnline: boolean
    dateBirth: Date
    timestamps: Date
    photo: string
    isVerified: boolean
    verifiedCode: string
    _id: string
    tokenFCM: string
    notification: Array<Types.ObjectId>
}

export interface ReqUser {
    name: string
    role: number
    email: string
    _id: string
    tokenFCM: string
    notification: Array<Types.ObjectId>
    isOnline: boolean
    photo: string
    isVerified: boolean
}

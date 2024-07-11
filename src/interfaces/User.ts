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
}

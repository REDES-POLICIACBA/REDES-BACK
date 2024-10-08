import type { Types } from 'mongoose'

export default interface ComisionesInterface {
    name: string
    date: Date
    process: string
    groupJob: Array<Types.ObjectId>
    schedule: string
    timeJob: number
    timeJourney: number
    id: Types.ObjectId
    description?: string
    observation?: string
}

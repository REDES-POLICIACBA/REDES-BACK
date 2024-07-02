export default interface UserInterface {
    name: string;
    email: string;
    password: string;
    role: number;
    createdAt: Date;
    isOnline: boolean;
    dateBirth: Date;
    _id: string;
    __v: number;
}
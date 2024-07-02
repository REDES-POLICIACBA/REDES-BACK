import UserInterface from "../interfaces/User";

class UserServices {
    UserModel: UserInterface;
    constructor(UserModel: UserInterface) {
        this.UserModel = UserModel;
    }
    async createUser(user: UserInterface) {
        try {
            return await this.UserModel.create(user)
        } catch (error) {
            throw new Error(`Ha ocurrido un error al crear el usuario, ${error}`)
        }
    }

}

export default UserServices;
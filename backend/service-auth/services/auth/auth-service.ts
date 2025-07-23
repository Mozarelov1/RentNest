const User = require("../../models/user-model")
import { AuthDataSource } from "../../config/data-source";

class AuthService{

    private authRepo = AuthDataSource.getRepository<typeof User>("User");

    async findUserById(userId: number){
        const user = await this.authRepo.findOne({ where: {userId} });
        if (!user){

        }
        return user
    };
}

module.exports = new AuthService()
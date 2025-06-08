const User = require("../models/user-model")
import { AuthDataSource } from "../config/data-source";

class AuthService{

    private authRepo = AuthDataSource.getRepository<typeof User>("User");

    async findUserById(id: number){
        const user = this.authRepo.findOne({ where: {id} });
        if (!user){

        }

        return user
    };



}

module.exports = new AuthService()
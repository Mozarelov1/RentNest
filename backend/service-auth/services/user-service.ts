const User = require("../models/user-model")
import { AuthDataSource } from "../config/data-source";
import { IUser } from "../dto/IUserDto";

import path from 'path';
import dotenv from 'dotenv';


dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });
const jwtCookieService = require('../../utils/JwtCookieService');

class UserService{

    private authRepo = AuthDataSource.getRepository<typeof User>("User");

    async findUserById(userId: number){
        const user = await this.authRepo.findOneById(userId);
        if (!user){
            throw new Error(`User with id=${userId} not found`);
        }
        return user
    };

    async getOwnInfo(token: string){
        const userId = jwtCookieService.getUserIdByToken(token, process.env.JWT_SECRET);
        if(!userId){
           throw new Error(`Unauthorized`)
        };
        const user = await this.authRepo.findOne({ where : { id: userId }});
        if (!user){
            throw new Error(`User with id=${userId} not found`);
        }
        return user
    }

    async getAllUsers() {
        return this.authRepo.find();
    };
    
    async updateUser(userId: number, data: Partial<typeof User>) {
        await this.authRepo.update({ id: userId }, data);
        return this.authRepo.findOne({ where: {id: userId}});
    };

    async deleteUser(userId: number) {
        await this.authRepo.update({ id: userId },{ status: "banned" });
        return this.authRepo.findOne({ where: {id: userId}});
    };

    async addRole(userId: number, newRole: IUser['role']){
        const user = await this.authRepo.findOne({ where: {id: userId} });
        user.role = newRole;
        await this.authRepo.save(user);
        return this.authRepo.findOne({ where: {id: userId}});
  }
}

module.exports = new UserService()
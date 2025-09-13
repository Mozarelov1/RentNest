const User = require("../models/user-model")
import { AuthDataSource } from "../config/data-source";
import { IUser } from "../dto/IUserDto";

import path from 'path';
import dotenv from 'dotenv';
import { UserInfo, UserRole, UserStatus } from "../dto/GetOwnInfo";
import { ShortUserInfo } from "../dto/ShortUserInfo";


dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });
const jwtCookieService = require('../../utils/JwtCookieService');

class UserService{

    private authRepo = AuthDataSource.getRepository<typeof User>("User");

    async findUserById(userId: number): Promise<ShortUserInfo>{
        const user = await this.authRepo.findOneById(userId);
        if (!user){
            throw new Error(`User with id=${userId} not found`);
        }
        const dto = {
            name:      user.name ?? undefined,
            photo:     user.photo ?? undefined,
            status:    user.status as UserStatus,
            createdAt: user.createdAt,
        }
        return dto
    };

    async getOwnInfo(token: string): Promise<UserInfo>{
        const userId = jwtCookieService.getUserIdByToken(token, process.env.JWT_SECRET) as any;
        if(!userId){
           throw new Error(`Unauthorized`)
        };
        const user = await this.authRepo.findOne({ where : { id: userId }});
        if (!user){
            throw new Error(`User with id=${userId} not found`);
        }
        const dto = {
            id:        user.id,
            email:     user.email,
            name:      user.name ?? undefined,
            photo:     user.photo ?? undefined,
            role:      user.role as UserRole,
            status:    user.status as UserStatus,
            createdAt: user.createdAt,
        }
        return dto
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
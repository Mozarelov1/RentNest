import { AuthDataSource } from "../../config/data-source";
import { IUser } from '../../dto/IUserDto';

const User = require("../../models/user-model");


class AdminService{ 
    private authRepo = AuthDataSource.getRepository<typeof User>("User");

    async getAllUsers() {
        return this.authRepo.find();
    };

    async getUserById(userId: number) {
        return this.authRepo.findOne({ where: {id: userId}});
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

module.exports = new AdminService();
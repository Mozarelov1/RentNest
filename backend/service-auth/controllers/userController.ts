import { Request, Response, NextFunction } from 'express';

const userService = require('../services/user-service')

class UserController{

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = +req.params.userId;
            const user = await userService.findUserById(userId);
            res.json(user);
        } catch (e) { 
            next(e); 
        }
    };
    async getOwnInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.jwt;
            const user = await userService.getOwnInfo(token);
            res.json(user);
        } catch (e) { 
            next(e); 
        }
    };

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = +req.params.userId;
            const data = req.body;
            const updatedUser = await userService.updateUser(userId, data);
            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = +req.params.userId;
            const bannedUser = await userService.deleteUser(userId);
            res.json(bannedUser);
        } catch (e) {
            next(e);
        }
    }

    async addRole(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = +req.params.userId;
            const { role } = req.body;
            const updatedUser = await userService.addRole(userId, role);
            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = new UserController();


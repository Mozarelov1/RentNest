import { Request, Response, NextFunction } from 'express';

const adminService = require('../services/admin/admin-service')

class AdminController{
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await adminService.getAllUsers();
            res.json(users);
        } catch (e) {
            next(e);
        }
     };
    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = +req.params.userId;
            const user = await adminService.getUserById(userId);
            res.json(user);
        } catch (e) { 
            next(e); 
        }
    };
    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = +req.params.userId;
            const data = req.body;
            const updatedUser = await adminService.updateUser(userId, data);
            res.json(updatedUser);
        }catch (e) { 
            next(e); 
        }
    };
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = +req.params.userId;
            await adminService.deleteUser(userId);
            res.status(204).end();
        } catch (e) { 
            next(e); 
        }
    };
    async addRole(req: Request, res: Response, next: NextFunction){
        try{
            const userId = +req.params.userId;
            const { role } = req.body;  
            const updatedRole = await adminService.addRole(userId, role);
            res.json(updatedRole);
        }catch(e){
            next(e); 
        }
    }

};

module.exports = new AdminController();
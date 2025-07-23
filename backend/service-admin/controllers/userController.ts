import { Request, Response, NextFunction } from 'express';

const userService = require('../services/user-service')

export class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (e) {
        console.error('Error creating property:', e); 
        next(e);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = +req.params.userId;
      const user = await userService.getUserById(userId);
      res.json(user);
    } catch (e) { 
        next(e); 
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = +req.params.userId;  
      const data = req.body;
      const updated = await userService.updateUser(userId,data);
      res.json(updated);
    } catch (e) { 
        next(e); 
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = +req.params.userId;
      await userService.deleteUser(userId);
      res.status(204).end();
    } catch (e) {
         next(e); 
    }
  }

    async addRole(req: Request, res: Response, next: NextFunction) {
      try {
        const userId = +req.params.userId;  
        const role = req.body.role;
        const updatedRole = await userService.addRole(userId,role);
        res.json(updatedRole);
      } catch (e) { 
          next(e); 
      }
  }

}

 

module.exports = new UserController();
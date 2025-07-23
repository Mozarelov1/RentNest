import { Request, Response, NextFunction } from 'express';

const adminService = require('../services/admin/admin-service')

class AdminController{
    async getAllProperties(req: Request, res: Response, next: NextFunction) {
        try {
            const properties = await adminService.getAllProperties();
            res.json(properties);
        } catch (e) {
            next(e);
        }
     };
    async getPropertyById(req: Request, res: Response, next: NextFunction) {
        try {
            const propertyId = +req.params.propertyId;
            const property = await adminService.getPropertyById(propertyId);
            res.json(property);
        } catch (e) { 
            next(e); 
        }
    };
    async updateProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const propertyId = +req.params.propertyId;
            const data = req.body;
            const updatedProperty = await adminService.updateProperty(propertyId, data);
            res.json(updatedProperty);
        }catch (e) { 
            next(e); 
        }
    };
    async deleteProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const propertyId = +req.params.propertyId;
            await adminService.deleteProperty(propertyId);
            res.status(204).end();
        } catch (e) { 
            next(e); 
        }
    }

};

module.exports = new AdminController();
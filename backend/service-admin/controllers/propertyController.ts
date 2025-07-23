import { Request, Response, NextFunction } from 'express';

const propertyService = require("../services/property-service")

class PropertyController{

    async getAllProperties(req: Request, res: Response, next: NextFunction) {
        try {
             const properties = await propertyService.getAllProperties();
             res.json(properties);
        } catch (e) {
          console.error('Error creating property:', e); 
          next(e);
        }
    }

    async getPropertyById(req: Request, res: Response, next: NextFunction) {
        try {
            const propertyId = +req.params.propertyId;
            const user = await propertyService.getPropertyById(propertyId);
            res.json(user);
        } catch (e) { 
          next(e); 
        }
    }

    async updateProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const propertyId = +req.params.propertyId;  
            const data = req.body;
            const updated = await propertyService.updateProperty(propertyId,data);
            res.json(updated);
        } catch (e) { 
          next(e); 
        }
    }

    async deleteProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const propertyId = +req.params.propertyId;
            await propertyService.deleteProperty(propertyId);
            res.status(204).end();
        } catch (e) {
          next(e); 
        }
    }

}

module.exports = new PropertyController();
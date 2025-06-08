import { Request, Response, NextFunction } from 'express';

const propertyService = require("../services/property-service")

import { CreatePropertyDto } from "../dto/CreatePropertyDto";

class PropertyController{

    createProperty(req: Request, res: Response, next: NextFunction){
        try{
            const dto: CreatePropertyDto = req.body;
            const property = propertyService.createProperty(dto)

            res.json(property)
        }catch(e){

        }
    }

    async getPropertyById(req: Request, res: Response, next: NextFunction){
        try{



        }catch(e){

        }
    }

    async updateProperty(req: Request, res: Response, next: NextFunction){
        try{



        }catch(e){

        }
    }

    async getProperties(req: Request, res: Response, next: NextFunction){
        try{



        }catch(e){

        }
    }

        async uploadPropertyPhoto(req: Request, res: Response, next: NextFunction){
        try{



        }catch(e){

        }
    }

} 

module.exports = new PropertyController()
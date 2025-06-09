import { Request, Response, NextFunction } from 'express';

const propertyService = require("../services/property-service")

import { CreatePropertyDto } from "../dto/CreatePropertyDto";
import { UpdatePropertyDto } from "../dto/UpdatePropertyDto";
import { upload } from '../../S3/s3';

class PropertyController{

    async createProperty(req: Request, res: Response, next: NextFunction){
        try{
            const dto: CreatePropertyDto = req.body;

            const property = await propertyService.createProperty(dto)
            res.json(property)
        }catch(e){
            console.error('Error creating property:', e);
            next(e);
        }
    }

    async getPropertyById(req: Request, res: Response, next: NextFunction){
        try{
            const id = Number(req.params.propertyId);

            const property = await propertyService.getPropertyById(id)
            res.json(property)
        }catch(e){
            console.error('Error creating property:', e);
            next(e);
        }
    }

    async updateProperty(req: Request, res: Response, next: NextFunction){
        try{
            const id = Number(req.params.propertyId);
            const dto: UpdatePropertyDto = req.body;

            const property = await propertyService.updateProperty(id,dto)
            res.json(property)
        }catch(e){
            console.error('Error creating property:', e);
            next(e);
        }
    }

    async getProperties(req: Request, res: Response, next: NextFunction){
        try{
            const properties = await propertyService.getProperties();
            res.json(properties)
        }catch(e){
            console.error('Error creating property:', e);
            next(e);
        }
    }

    async uploadPropertyPhoto(req: Request, res: Response, next: NextFunction){
        
    const singleUpload = () =>
      new Promise<Express.Multer.File>((resolve, reject) => {
        upload.single('photo')(req, res, (e: any) => {
          if (e) {
            console.error('Multer error:', e);
            return reject(e);
          }
          if (!req.file) {
            return reject(new Error('No file provided'));
          }
          resolve(req.file);
        });
      });

    try {
      const file: Express.Multer.File = await singleUpload();
      const fileUrl = (file as any).location as string;
      if (!fileUrl) {
        throw new Error('Uploaded file has no public URL');
      }

      const propertyId = Number(req.params.propertyId);
      const updatedProperty = await propertyService.uploadPropertyPhoto(propertyId, fileUrl);

      return res.json({ success: true, property: updatedProperty });

        }catch(e){
            console.error('Error creating property:', e);
            next(e);
        }

    }
} 

module.exports = new PropertyController()
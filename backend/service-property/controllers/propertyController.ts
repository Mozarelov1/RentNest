import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import dotenv from "dotenv";
import path from "path";

const propertyService = require("../services/property-service")
const jwtCookieService = require('../../utils/JwtCookieService');

import { CreatePropertyDto } from "../dto/CreatePropertyDto";
import { UpdatePropertyDto } from "../dto/UpdatePropertyDto";
import { upload } from '../../S3/s3';


dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

class PropertyController{

    async createProperty(req: Request, res: Response, next: NextFunction){ 
        try{
            const token = req.cookies.accessToken;

            if (!token) {
              return res.status(401).json({ message: 'Unauthorized: token missing' });
            };
            const userId = jwtCookieService.getUserIdByToken(token, process.env.JWT_SECRET);

            const dto: CreatePropertyDto = req.body;
            dto.ownerId = userId;

            const property = await propertyService.createProperty(dto)

            res.json(property);
            await axios.post(`${process.env.SEARCH_SERVICE_URL}/api/search/index`,property);
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

    async deleteProperty(req: Request, res: Response, next: NextFunction){
        try{
            const id = Number(req.params.propertyId);

            await propertyService.deleteProperty(id);

            res.json({ delete: "success" })
        }catch(e){
            console.error('Error creating property:', e);
            next(e); 
        }
    };
    async deletePropertySoft(req: Request, res: Response, next: NextFunction) {
        try {
            const propertyId = +req.params.propertyId;
            await propertyService.deletePropertySoft(propertyId);
            res.status(204).end();
        } catch (e) { 
            next(e); 
        }
    };
    async restoreProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const propertyId = +req.params.propertyId;
            const restoredReview = await propertyService.restoreProperty(propertyId);
            res.json(restoredReview);
        } catch (e) {
            next(e);
        }
     };   

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

    async getOwnerByProperty(req: Request, res: Response, next: NextFunction){
        const id = Number(req.params.propertyId);

        const property = await propertyService.getPropertyById(id);
        res.json(property.ownerId);
    }

} 

module.exports = new PropertyController()
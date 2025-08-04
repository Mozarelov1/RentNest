import { CreatePropertyDto } from "../dto/CreatePropertyDto";
import { PropertyDataSource } from "../config/data-source";
import Boom from '@hapi/boom';
import type { Express } from 'express';
import { UpdatePropertyDto } from "../dto/UpdatePropertyDto";

const Property = require("../models/property-model")

class PropertyService{

    private propertyRepo = PropertyDataSource.getRepository<typeof Property>("Property");

    async createProperty(dto: CreatePropertyDto){
        const property = await this.propertyRepo.create({

        title: dto.title,
        description: dto.description ?? null,
        city: dto.city,
        region: dto.region ?? null,
        street: dto.street ?? null,
        pricePerNight: dto.pricePerNight,
        currency: dto.currency,
        bedrooms: dto.bedrooms,
        bathrooms: dto.bathrooms,
        area: dto.area ?? null,
        amenities: dto.amenities ?? [],
        availableFrom: dto.availableFrom ?? null,
        availableTo: dto.availableTo ?? null,
        owner: { id: dto.ownerId } as any, 
        ownerId: dto.ownerId

        })

        const savedProperty = await this.propertyRepo.save(property);
        return savedProperty;
    }

    async getPropertyById(propertyId: number){
        const property = await this.propertyRepo.findOne({ where: {id :propertyId} })
        if(!property){
            throw new Error(`Property with id=${propertyId} not found`);
        }
        return property;
    };

    async updateProperty(propertyId: number,dto: UpdatePropertyDto){
        const property = await this.propertyRepo.findOne({ where: { id :propertyId } })
        if(!property){
            throw new Error(`Property with id=${propertyId} not found`);
        }

        const { id: _ignore, ...data } = dto as any;

        await this.propertyRepo.update(propertyId, data as Partial<typeof Property>);
        return this.propertyRepo.findOneBy({id :propertyId})
    };

    async getProperties(){
        return await this.propertyRepo.find()
    };

    async deleteProperty(propertyId: number){
        const property = await this.propertyRepo.findOne({ where: {id :propertyId} })
        if(!property){
            throw new Error(`Property with id=${propertyId} not found`);
        }

        await this.propertyRepo.delete(propertyId);
    };

    async deletePropertySoft(propertyId: string){
        await this.propertyRepo.update({ id: propertyId },{ status: "deleted" });
        return this.propertyRepo.findOne({ where: {id: propertyId}});
    };

    async restoreProperty(propertyId: string){
        await this.propertyRepo.update({ id: propertyId },{ status: "active" });
        return this.propertyRepo.findOne({ where: {id: propertyId}});
    };

   async uploadPropertyPhoto(propertyId: number, fileUrl: string) {
       const property = await this.propertyRepo.findOne({ where: { id: propertyId } });
       if (!property) {
            throw new Error(`Property with id=${propertyId} not found`);
        }

        property.photos = Array.isArray(property.photos) ? property.photos : [];
        property.photos.push(fileUrl);
        return this.propertyRepo.save(property);
  }
}

module.exports = new PropertyService()
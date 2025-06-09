import { CreatePropertyDto } from "../dto/CreatePropertyDto";
import { PropertyDataSource } from "../config/data-source";
import Boom from '@hapi/boom';
import type { Express } from 'express';

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

    async getPropertyById(id: number){
        const property = await this.propertyRepo.findOne({ where: {id} })

        if(!property){
            throw  Boom.notFound('property not found');
        }

        return property;
    };

    async updateProperty(id: number,dto: CreatePropertyDto){
        const property = await this.propertyRepo.findOne({ where: {id} })

        if(!property){
            throw Boom.notFound('property not found');
        }

        await this.propertyRepo.update(id,dto);

        return this.propertyRepo.findOneBy({id})

    };

    async getProperties(){
        return await this.propertyRepo.find()
    };

   async uploadPropertyPhoto(propertyId: number, fileUrl: string) {
    const property = await this.propertyRepo.findOne({ where: { id: propertyId } });
    if (!property) {
      throw Boom.notFound(`Property with id=${propertyId} not found`);
    }

    property.photos = Array.isArray(property.photos) ? property.photos : [];
    property.photos.push(fileUrl);

    return this.propertyRepo.save(property);
  }

}

module.exports = new PropertyService()
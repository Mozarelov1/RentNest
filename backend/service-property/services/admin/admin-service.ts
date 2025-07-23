import { PropertyDataSource } from "../../config/data-source";

const Property = require("../../models/property-model");

class AdminService{ 
    private propertyRepo = PropertyDataSource.getRepository<typeof Property>("Property");

    async getAllProperties() {
        return this.propertyRepo.find();
    };

    async getPropertyById(propertyId: number) {
        return this.propertyRepo.findOne({ where: {id: propertyId}});
    };

    async updateProperty(propertyId: number, data: Partial<typeof Property>) {
        await this.propertyRepo.update({ id: propertyId }, data);
        return this.propertyRepo.findOne({ where: {id: propertyId}});
    };

    async deleteProperty(propertyId: number) {
        await this.propertyRepo.update({ id: propertyId },{ status: "deleted" });
        return this.propertyRepo.findOne({ where: {id: propertyId}});
    };

}

module.exports = new AdminService();
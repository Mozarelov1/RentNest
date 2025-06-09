import {EntitySchema} from "typeorm"

module.exports = new EntitySchema({
    name:"Property",
    tableName:"properties",
    columns:{
     id: {
      type: "int",
      primary: true,
      generated: true,
    },
    title: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    description: {
      type: "text",
      nullable: true,
    },
    city: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    region: {
      type: "varchar",
      length: 100,
      nullable: true,
    },
    street: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    pricePerNight: {
      type: "int",
      nullable: false,
    },
    currency: {
      type: "varchar",
      length: 3,
      default: "USD",
    },
    bedrooms: {
      type: "int",
      default: 1,
    },
    bathrooms: {
      type: "int",
      default: 1,
    },
    area: {
      type: "int",
      nullable: true,
    },
    amenities: {
      type: "simple-array",
      nullable: true,
    },
    availableFrom: {
      type: "timestamp",
      nullable: true,
    },
    availableTo: {
      type: "timestamp",
      nullable: true,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
    ownerId: {
      type: "int",
      nullable: false,
    },
    photos: {
      type:"simple-array",
      nullable: true,
    },
        }
})
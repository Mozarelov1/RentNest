import {EntitySchema} from "typeorm"

module.exports = new EntitySchema({
    name:"Reservation",
    tableName:"reservations",
    columns:{
     id: {
      type: "int",
      primary: true,
      generated: true,
    },

    propertyID: {
      type: "int",
      nullable: false,
    },

    tenantID: {
      type: "int",
      nullable: false,
    },

    guests: {
      type: "int",  
      nullable: false,
    },

    startDate: {
      type: "timestamp",
      nullable: false,    
    },

    endDate: {
      type: "timestamp",
      nullable: false,    
    },

    status:  {
      type: "enum",
      enum: ["pending", "confirmed", "declined", "cancelled", "paid", "checked_in", "checked_out"],
      nullable: false,
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

        }
})
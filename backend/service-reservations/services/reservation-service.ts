import { ReservationDataSource } from "../config/data-source"
import { CreateReservationDto } from "../dto/CreateReservationDto"
import { UpdateReservationDto } from "../dto/UpdateReservationDto"

const authService = require("../../service-auth/services/user-service")

const Reservation = require("../models/reservation-model")

class ReservationService{

    private reservationRepo = ReservationDataSource.getRepository<typeof Reservation>("Reservation");

    async createReservation(dto: CreateReservationDto){
        const reservation = this.reservationRepo.create({
            propertyID: dto.propertyID,
            guests: dto.guests,
            startDate: dto.startDate,
            endDate: dto.endDate,
            ownerId: dto.ownerId,
            tenantID: dto.tenantID,
            status: "pending"
        })

        const savedReservation = await this.reservationRepo.save(reservation);
        return savedReservation
    };

    async getReservationList(userID: number){

        const tenant = await authService.findUserById(userID);
        if(!tenant){
            throw new Error(`Tenant with id=${userID} not found`);
        }

        const reservations = await this.reservationRepo.findBy({ "renantID": userID } )
        if(!reservations){
            throw new Error(`Reservations with tenantId=${userID} not found`);
        }

        return reservations
    };

    async getReservationDetails(reservationID : number){

        const reservation = await this.reservationRepo.findOneBy({ "id": reservationID } )
        if(!reservation){
            throw new Error(`Reservation with id=${reservationID} not found`);
        }

        return reservation
    };

    async updateReservation(reservationID : number, dto: UpdateReservationDto){

        const reservation = await this.reservationRepo.findOneBy({ "id": reservationID } )
        if(!reservation){
            throw new Error(`Reservation with id=${reservationID} not found`);
        }

        await this.reservationRepo.update(reservationID,dto)
        return this.reservationRepo.findOneBy({reservationID})
    };

    async cancelReservation(reservationID : number){

        const reservation = await this.reservationRepo.findOneBy({ "id": reservationID } )
        if(!reservation){
            throw new Error(`Reservation with id=${reservationID} not found`);
        }

        const cancelledReservation = await this.reservationRepo.update(reservationID, {status : "cancelled"})
        return cancelledReservation;
    };

    async getOwnerReservationList(ownerId: number){

        const owner = await authService.findUserById(ownerId);
        if(!owner){
            throw new Error(`Owner with id=${ownerId} not found`);
        }

        const reservations = await this.reservationRepo.findBy({ "ownerID": ownerId } )
        if(!reservations){
            throw new Error(`Reservations with ownerId=${ownerId} not found`);
        }

        return reservations
    };

    async getAllReservations() {
        return this.reservationRepo.find();
    };

}

module.exports = new ReservationService()
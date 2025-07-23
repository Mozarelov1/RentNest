import { ReservationDataSource } from "../../config/data-source";

const Reservation = require("../../models/reservation-model");

class AdminService{ 
    private reservationRepo = ReservationDataSource.getRepository<typeof Reservation>("Reservation");

    async getAllReservations() {
        return this.reservationRepo.find();
    };

    async getReservationById(reservationId: number) {
        return this.reservationRepo.findOne({ where: {id: reservationId}});
    }
}

module.exports = new AdminService();
import { Request, Response, NextFunction } from 'express';

const reservationService = require("../services/reservation-service")

class ReservationController{

    async getAllReservations(req: Request, res: Response, next: NextFunction) {
        try {
             const reservations = await reservationService.getAllReservations();
             res.json(reservations);
        } catch (e) {
          console.error('Error creating property:', e); 
          next(e);
        }
    }

    async getReservationById(req: Request, res: Response, next: NextFunction) {
        try {
            const reservationId = +req.params.reservationId;
            const reservation = await reservationService.getReservationById(reservationId);
            res.json(reservation);
        } catch (e) { 
          next(e); 
        }
    }

}

module.exports = new ReservationController();
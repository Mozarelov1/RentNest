import { Request, Response, NextFunction } from 'express';

const adminService = require('../services/admin/admin-service')

class AdminController{
    async getAllReservations(req: Request, res: Response, next: NextFunction) {
        try {
            const reservations = await adminService.getAllReservations();
            res.json(reservations);
        } catch (e) {
            next(e);
        }
     };
    async getReservationById(req: Request, res: Response, next: NextFunction) {
        try {
            const reservationId = req.params.reservationId;
            const reservation = await adminService.getReservationById(reservationId);
            res.json(reservation);
        } catch (e) { 
            next(e); 
        }
    };
};

module.exports = new AdminController();
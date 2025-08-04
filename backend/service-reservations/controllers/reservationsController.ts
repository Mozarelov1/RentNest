import { Request, Response, NextFunction } from 'express';
import { CreateReservationDto } from "../dto/CreateReservationDto"
import { UpdateReservationDto } from "../dto/UpdateReservationDto"

import dotenv from "dotenv"
import path  from "path";

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const jwt = require('jsonwebtoken');

const reservationService = require('../services/reservation-service');
const jwtCookieService = require('../../utils/JwtCookieService');

class ReservationController{

    async createReservation(req: Request, res: Response, next: NextFunction){
        try{
            const token = req.cookies.jwt;
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized: token missing' });
            };
            const userId = jwtCookieService.getUserIdByToken(token, process.env.JWT_SECRET)

            const dto: CreateReservationDto = req.body;
            dto.tenantID = userId;

            const reservation = await reservationService.createReservation(dto);

        res.json(reservation)
        }catch(e){
            console.error('Error creating property:', e);
            next(e);
        }
    };

    async getReservationList(req: Request, res: Response, next: NextFunction){
        try{
            const token = req.cookies.jwt;
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized: token missing' });
            };
            const userId = jwtCookieService.getUserIdByToken(token, process.env.JWT_SECRET)

            const reservations = await reservationService.getReservationList(userId);

        res.json(reservations)
        }catch(e){
            console.error('Error creating property:', e);
            next(e);
        }
    };

    async getReservationDetails(req: Request, res: Response, next: NextFunction){
        try{
            const reservID = req.params.bookingId;
            if(!reservID){
                return res.status(404).json({ message: 'Reservation not found' });
            }
            
            const reservation = await reservationService.getReservationDetails(reservID);

        res.json(reservation)
        }catch(e){
            console.error('Error creating property:', e);
            next(e);
        }
    };

    async updateReservation(req: Request, res: Response, next: NextFunction){
        try{
            const reservID = req.params.bookingId;
            if(!reservID){
                return res.status(404).json({ message: 'Reservation not found' });
            }

            const dto: UpdateReservationDto = req.body;
            const reservation = await reservationService.updateReservation(reservID,dto);

        res.json(reservation)
        }catch(e){
            console.error('Error creating property:', e);
            next(e);
        }
    };

    async cancelReservation(req: Request, res: Response, next: NextFunction){
        try{
            const reservID = req.params.bookingId;
            if(!reservID){
                return res.status(404).json({ message: 'Reservation not found' });
            }

            const cancelledReservation = await reservationService.cancelReservation(reservID);
            res.status(204).send()
        }catch(e){
            console.error('Error creating property:', e);
            next(e);
        }
    };

    async getOwnerReservationList(req: Request, res: Response, next: NextFunction){
        try{

        }catch(e){
            console.error('Error creating property:', e);
            next(e);
        }
    };
    async getAllReservations(req: Request, res: Response, next: NextFunction) {
        try {
            const reservations = await reservationService.getAllReservations();
            res.json(reservations);
        } catch (e) {
            next(e);
        }
     };

}

module.exports = new ReservationController()
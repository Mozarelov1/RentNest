import { Request, Response, NextFunction } from 'express';
import { CreateReservationDto } from "../dto/CreateReservationDto"
import { UpdateReservationDto } from "../dto/UpdateReservationDto"

import dotenv from "dotenv"
import path  from "path";

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const jwt = require('jsonwebtoken');

const reservationService = require('../services/reservation-service')

class ReservationController{

    async createReservation(req: Request, res: Response, next: NextFunction){
        try{
            const token = req.cookies.jwt;
            if(!token){

            };
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const userID = payload.sub;

            const dto: CreateReservationDto = req.body;
            dto.tenantID = userID;

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
            if(!token){

            };
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const userID = payload.sub;

            const reservations = await reservationService.getReservationList(userID);

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

            }

            const cancelledReservation = await reservationService.cancelledReservation(reservID);
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

}

module.exports = new ReservationController()
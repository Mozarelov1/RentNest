import express from "express";
import dotenv from "dotenv";
import path from "path";

const router = express.Router();
import { authorize } from '../../service-auth/middlewares/rbacRole-middleware';
import { ReservationDataSource } from "../config/data-source";
import { ownerOnly } from "../../service-auth/middlewares/rbacOwnerOnly-middleware";
const reservController = require('../controllers/reservationsController')
const Reservation = require('../models/reservation-model')

const reservationRepo = ReservationDataSource.getRepository<typeof Reservation>("Reservation");


dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });


router.post('/new',              authorize(['admin', 'moderator', 'user']),reservController.createReservation);
router.get('/my',                authorize(['admin', 'moderator', 'user']),reservController.getReservationList);
router.get('/',                  authorize(['admin']),         reservController.getAllReservations);
router.get('/:bookingId',        authorize(['admin', 'moderator', 'user']),ownerOnly(reservationRepo, { paramIdName: 'bookingId', ownerField: ['tenantID','ownerId']}), reservController.getReservationDetails);
router.put('/:bookingId',        authorize(['admin', 'moderator', 'user']),ownerOnly(reservationRepo, { paramIdName: 'bookingId', ownerField: ['tenantID','ownerId']}), reservController.updateReservation);
router.delete('/:bookingId/cancel',authorize(['admin', 'moderator', 'user']),ownerOnly(reservationRepo, { paramIdName: 'bookingId', ownerField: ['tenantID','ownerId']}), reservController.cancelReservation);
router.post('/host',             authorize(['admin', 'moderator', 'user']),  reservController.getOwnerReservationList);


module.exports = router;
import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import path from "path";

const router = express.Router();

const reservController = require('../controllers/reservationsController')

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });


router.post('/new', reservController.createReservation);
router.get('/my', reservController.getReservationList);
router.get('/:bookingId', reservController.getReservationDetails);
router.put('/:bookingId', reservController.updateReservation);
router.post('/:bookingId/cancel', reservController.cancelReservation);
router.post('/host', reservController.getOwnerReservationList);


module.exports = router;
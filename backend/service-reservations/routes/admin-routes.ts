import express from "express";
const router = express.Router();

const adminController = require('../controllers/adminController')

router.get('/',         adminController.getAllReservations);
router.get('/:reservationId', adminController.getReservationById);

module.exports = router;



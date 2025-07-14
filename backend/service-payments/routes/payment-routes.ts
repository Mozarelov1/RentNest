import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import path from "path";

const router = express.Router();

const paymentController = require('../controllers/paymentsController')

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });


router.post('/initiate',paymentController.createPayment);
router.post('/:id/cancel',paymentController.cancelPayment);
router.get('/:id',paymentController.getPaymentById);
router.get('/:id/history',paymentController.getPaymentList);
router.put('/:id/status',paymentController.updatePaymentStatus);



module.exports = router;
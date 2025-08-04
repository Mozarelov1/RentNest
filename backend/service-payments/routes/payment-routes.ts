import express from "express";
import dotenv from "dotenv";
import path from "path";

const router = express.Router();
import { authorize } from '../../service-auth/middlewares/rbacRole-middleware';
import { PaymentDataSource } from "../config/data-source";
import { ownerOnly } from "../../service-auth/middlewares/rbacOwnerOnly-middleware";

const Payment = require('../models/payment-model')
const paymentController = require('../controllers/paymentsController')


const paymentRepo = PaymentDataSource.getRepository<typeof Payment>(Payment);


dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });


router.post('/initiate',      authorize(['admin', 'moderator', 'user']), paymentController.createPayment);
router.post('/:id/cancel',    authorize(['admin', 'moderator', 'user']), ownerOnly(paymentRepo, { paramIdName: 'id', ownerField: 'userID' }), paymentController.cancelPayment);
router.get('/history',        authorize(['admin', 'moderator', 'user']), paymentController.getPaymentList);
router.get('/:id',            authorize(['admin', 'moderator', 'user']), ownerOnly(paymentRepo, { paramIdName: 'id', ownerField: 'userID' }), paymentController.getPaymentById);
router.put('/:id/status',     authorize(['admin', 'moderator', 'user']),  paymentController.updatePaymentStatus);



module.exports = router;
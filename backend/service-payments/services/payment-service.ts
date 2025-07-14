import { PaymentDataSource } from "../config/data-source";
import { CreatePaymentDto } from "../dto/CreatePaymentDto";
import { fondy } from "../config/payment"; 
const Payment = require("../models/payment-model")

class PaymentService {
  private paymentRepo = PaymentDataSource.getRepository<typeof Payment>(Payment);

  async createPayment(dto: CreatePaymentDto) {
    const { amount, currency, userID } = dto;

    const requestData = {
      order_id: `order_${Date.now()}`,
      order_desc: `Payment for user ${userID}`,
      amount: (amount * 100).toString(),
      currency,
      server_callback_url: `${process.env.APP_URL}/api/payments/webhook`,
    };
    const fondyResponse = await (fondy as any).Checkout(requestData);

    const internalStatus = fondyResponse.response_status === "success"
    ? "pending"
    : fondyResponse.response_status; 

    const payment = this.paymentRepo.create({
      ipspPaymentId: fondyResponse.checkout_id || requestData.order_id,
      amount,
      currency,
      status: internalStatus,
      userID,
      redirectUrl: fondyResponse.checkout_url,
    });
    await this.paymentRepo.save(payment);

    return payment;
  }

  async getPaymentList(id: string) {
    return this.paymentRepo.find({ where: { userID: id } });
  }

  async getPaymentById(id: string) {
    return this.paymentRepo.findOneBy({ id });
  }

  async updatePaymentStatus(id: string, status: string) {
    await this.paymentRepo.update(id, { status });
    return this.paymentRepo.findOneBy({ id });
  }

  async cancelPayment(id: string) {
    return this.updatePaymentStatus(id, "cancelled");
  }
}

module.exports = new PaymentService();

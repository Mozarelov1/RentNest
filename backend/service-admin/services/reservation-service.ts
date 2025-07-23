import axios , { AxiosInstance } from "axios";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

const reservationApi: AxiosInstance = axios.create({
  baseURL: process.env.URL,
  timeout: 15000
});

class ReservationAdminService{
  async  getAllReservations() {
    const resp = await reservationApi.get('/api/reservation/admin');
    return resp.data;
  }

  async  getReservationById(reservationId: number) {
    const resp = await reservationApi.get(`/api/reservation/admin/${reservationId}`);
    return resp.data;
  }

};

module.exports = new ReservationAdminService();
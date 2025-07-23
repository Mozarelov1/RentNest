import axios , { AxiosInstance } from "axios";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

const reviewApi: AxiosInstance = axios.create({
  baseURL: process.env.URL,
  timeout: 15000
});

class ReviewAdminService{
  async  getAllReviews() {
    const resp = await reviewApi.get('/api/review/admin');
    return resp.data;
  }

  async  getReviewById(reviewId: string) {
    const resp = await reviewApi.get(`/api/review/admin/${reviewId}`);
    return resp.data;
  }

  async  updateReview(reviewId: string, body: any) {
    const resp = await reviewApi.put(`/api/review/admin/${reviewId}`, body);
    return resp.data;
  }

  async  deleteReview(reviewId: string) {
    await reviewApi.delete(`/api/review/admin/${reviewId}`);
  }

};

module.exports = new ReviewAdminService();
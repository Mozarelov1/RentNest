import { ReviewDataSource } from "../../config/data-source";

const Review = require("../../models/review-model");

class AdminService{ 
    private reviewRepo = ReviewDataSource.getRepository<typeof Review>("Reviews");

    async getAllReviews() {
        return this.reviewRepo.find();
    };

    async getReviewById(reviewId: string) {
        return this.reviewRepo.findOne({ where: {id: reviewId}});
    };

    async updateReview(reviewId: string, data: Partial<typeof Review>) {
        await this.reviewRepo.update({ id: reviewId }, data);
        return this.reviewRepo.findOne({ where: {id: reviewId}});
    };

    async deleteReview(reviewId: string) {
        await this.reviewRepo.update({ id: reviewId },{ status: "deleted" });
        return this.reviewRepo.findOne({ where: {id: reviewId}});
    };

}

module.exports = new AdminService();
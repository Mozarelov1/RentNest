import { ReviewDataSource } from "../config/data-source";
import { CreateReviewDto } from '../dto/CreateReviewDto';

const Review = require("../models/review-model")

class ReviewService{
  private reviewRepo = ReviewDataSource.getRepository<typeof Review>("Reviews");
  
    async createReview (dto: CreateReviewDto){

        const { rating, comment, bookingID, propertyID, senderID, propertyOwnerId } = dto;

        const review = this.reviewRepo.create({
        rating,
        comment,
        bookingID,
        propertyID,
        senderID,
        status: 'uploaded',
        propertyOwnerId
        });
        await this.reviewRepo.save(review);
        return review;
    }

    async getReviewsByProperty(propertyID: number){
        return this.reviewRepo.find({
            where: { propertyID, status: 'uploaded' }
         });
     }

    async getMyReviews(senderID: number) {
        return this.reviewRepo.find({
        where: { senderID, status: 'uploaded' }
        });
     }

  async deleteReview(reviewID: number) {
        const review = await this.reviewRepo.findOneBy({ id: reviewID });
        review.status = 'deleted';
        return this.reviewRepo.save(review);
  }

  async updateReview(reviewID: string | number, data: Partial<Pick<typeof Review, 'rating' | 'comment' | 'status'>>) {
        const review = await this.reviewRepo.findOneBy({ id: reviewID });
        if (!review) {
            throw new Error(`Review with ID ${reviewID} not found`);
        }
        Object.assign(review, data);

        return this.reviewRepo.save(review);
  }
  async deleteReviewSoft(reviewId: string){
        await this.reviewRepo.update({ id: reviewId },{ status: "deleted" });
        return this.reviewRepo.findOne({ where: {id: reviewId}});
    };

  async restoreReview(reviewId: string){
        await this.reviewRepo.update({ id: reviewId },{ status: "uploaded" });
        return this.reviewRepo.findOne({ where: {id: reviewId}});
    }
  async getAllReviews() {
        return this.reviewRepo.find();
    };

  async getReviewById(reviewId: string) {
        return this.reviewRepo.findOne({ where: {id: reviewId}});
    };

}

module.exports = new ReviewService()
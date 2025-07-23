import { Request, Response, NextFunction } from 'express';

const reviewService = require("../services/review-service")

class ReviewController{

    async getAllReviews(req: Request, res: Response, next: NextFunction) {
        try {
             const reviews = await reviewService.getAllReviews();
             res.json(reviews);
        } catch (e) {
          console.error('Error creating property:', e); 
          next(e);
        }
    }

    async getReviewById(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.reviewId;
            const review = await reviewService.getReviewById(reviewId);
            res.json(review);
        } catch (e) { 
          next(e); 
        }
    }

    async updateReview(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.reviewId;  
            const data = req.body;
            const updated = await reviewService.updateReview(reviewId,data);
            res.json(updated);
        } catch (e) { 
          next(e); 
        }
    }

    async deleteReview(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.reviewId;
            await reviewService.deleteReview(reviewId);
            res.status(204).end();
        } catch (e) {
          next(e); 
        }
    }

}

module.exports = new ReviewController();
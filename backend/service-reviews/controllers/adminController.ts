import { Request, Response, NextFunction } from 'express';

const adminService = require('../services/admin/admin-service')

class AdminController{
    async getAllReviews(req: Request, res: Response, next: NextFunction) {
        try {
            const reviews = await adminService.getAllReviews();
            res.json(reviews);
        } catch (e) {
            next(e);
        }
     };
    async getReviewById(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.reviewId;
            const review = await adminService.getReviewById(reviewId);
            res.json(review);
        } catch (e) { 
            next(e); 
        }
    };
    async updateReview(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.reviewId;
            const data = req.body;
            const updatedReview = await adminService.updateReview(reviewId, data);
            res.json(updatedReview);
        }catch (e) { 
            next(e); 
        }
    };
    async deleteReview(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.reviewId;
            await adminService.deleteReview(reviewId);
            res.status(204).end();
        } catch (e) { 
            next(e); 
        }
    }

};

module.exports = new AdminController();
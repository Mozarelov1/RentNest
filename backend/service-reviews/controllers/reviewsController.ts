import { Request, Response, NextFunction } from 'express';


const jwt = require('jsonwebtoken');

const reviewService = require("../services/review/review-service")

class ReviewController {

    async createReview(req: Request, res: Response, next: NextFunction){
        try{
            const token = req.body.jwt;
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized: token missing' });
            }
            const payload: any = jwt.verify(token, process.env.JWT_SECRET);
            const senderID = payload.sub;

            const propertyID = parseInt(req.params.propertyId, 10);
            const { rating, comment, bookingID } = req.body;
            const dto = { rating, comment, bookingID, propertyID, senderID };

            const review = await reviewService.createReview(dto);
            return res.status(201).json(review);
        }catch(e){
            console.error('Error creating property:', e);
            next(e); 
        }
    };

    async getReviewsByProperty(req: Request, res: Response, next: NextFunction){
        try{
            const propertyID = parseInt(req.params.propertyId, 10);
            const reviews = await reviewService.getReviewsByProperty(propertyID);

            return res.json(reviews);
        }catch(e){
            console.error('Error creating property:', e);
            next(e); 
        }
    };

    async deleteReview(req: Request, res: Response, next: NextFunction){
        try{
            const reviewID = req.params.reviewId;
            const result = await reviewService.deleteReview(reviewID);
            
            return res.status(200).json(result);
        }catch(e){
            console.error('Error creating property:', e);
            next(e); 
        }
    };

    async getMyReviews(req: Request, res: Response, next: NextFunction){
        try{
            const { senderId } = req.params;
            if (!senderId) {
                  return res.status(400).json({ message: 'Bad Request: id missing in params' });
            }
            const reviews = await reviewService.getMyReviews(senderId);
            return res.json(reviews);
        }catch(e){
            console.error('Error creating property:', e);
            next(e); 
        }
    };

    async updateReview(req: Request, res: Response, next: NextFunction){
        try{
            const reviewID = req.params.reviewId;
            const { rating, comment } = req.body;
            const updated = await reviewService.updateReview(reviewID, { rating, comment });
     
            return res.json(updated);
        }catch(e){
            console.error('Error creating property:', e);
            next(e); 
        }
    };
    

}

module.exports = new ReviewController()
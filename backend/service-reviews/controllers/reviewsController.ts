import axios from 'axios';
import { Request, Response, NextFunction } from 'express';


const jwt = require('jsonwebtoken');

const reviewService = require("../services/review-service");
const jwtCookieService = require('../../utils/JwtCookieService');

class ReviewController {

    async createReview(req: Request, res: Response, next: NextFunction){
        try{
            const token = req.cookies.jwt;
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized: token missing' });
            };
            const senderID = jwtCookieService.getUserIdByToken(token, process.env.JWT_SECRET);

            const propertyID = parseInt(req.params.propertyId, 10);
            const { rating, comment, bookingID } = req.body;
            const dto = { rating, comment, bookingID, propertyID, senderID };
            
            const response = await axios.get(`http://localhost:2002/api/properties/${propertyID}/owner`, {headers: { Cookie: `jwt=${token}` }, timeout: 5000});
            const ownerId = response.data;

            const review = await reviewService.createReview({...dto, propertyOwnerId: ownerId});
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
            const token = req.cookies.jwt;
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized: token missing' });
            };
            const senderID = jwtCookieService.getUserIdByToken(token, process.env.JWT_SECRET);

            const reviews = await reviewService.getMyReviews(senderID);
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
    async deleteReviewSoft(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.reviewId;
            await reviewService.deleteReviewSoft(reviewId);
            res.status(204).end();
        } catch (e) {
            next(e);
        }
     };

    async restoreReview(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.reviewId;
            const restoredReview = await reviewService.restoreReview(reviewId);
            res.json(restoredReview);
        } catch (e) {
            next(e);
        }
     };

    async getAllReviews(req: Request, res: Response, next: NextFunction) {
        try {
            const reviews = await reviewService.getAllReviews();
            res.json(reviews);
        } catch (e) {
            next(e);
        }
     };
    async getReviewById(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.reviewId;
            const review = await reviewService.getReviewById(reviewId);
            res.json(review);
        } catch (e) { 
            next(e); 
        }
    };

}

module.exports = new ReviewController()
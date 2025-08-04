import express from "express";
const router = express.Router();

const reviewsController = require('../controllers/reviewsController')
import { authorize } from '../../service-auth/middlewares/rbacRole-middleware'
import { ReviewDataSource } from "../config/data-source";
import { ownerOnly } from "../../service-auth/middlewares/rbacOwnerOnly-middleware";

const Review = require("../models/review-model");

const reviewRepo = ReviewDataSource.getRepository<typeof Review>("Reviews");

router.post('/:propertyId', authorize(['admin', 'moderator', 'user']), reviewsController.createReview);
router.get('/:propertyId',  authorize(['admin', 'moderator', 'user']), reviewsController.getReviewsByProperty);
router.get('/',             authorize(['admin'])                     , reviewsController.getAllReviews);
router.get('/:reviewId',    authorize(['admin'])                     , reviewsController.getReviewById);
router.get('/my',           authorize(['admin', 'moderator', 'user']), reviewsController.getMyReviews);
router.put('/:reviewId/edit',    authorize(['admin', 'moderator', 'user']),ownerOnly(reviewRepo, { paramIdName: 'reviewId', ownerField: ['senderID']}), reviewsController.updateReview);
router.put('/:reviewId/restore',    authorize(['admin', 'moderator']), reviewsController.restoreReview);
router.delete('/:reviewId/delete',  authorize(['admin'])             , reviewsController.deleteReview);
router.delete('/:reviewId/delete/soft',authorize(['admin', 'moderator', 'user']),ownerOnly(reviewRepo, { paramIdName: 'reviewId', ownerField: ['senderID', 'propertyOwnerId']}), reviewsController.deleteReviewSoft);



module.exports = router;
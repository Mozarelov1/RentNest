import express from "express";
const router = express.Router();

const reviewsController = require('../controllers/reviewsController')

router.post('/:propertyId', reviewsController.createReview);
router.get('/:propertyId', reviewsController.getReviewsByProperty);
router.get('/:senderId/my', reviewsController.getMyReviews);
router.delete('/:reviewId', reviewsController.deleteReview);
router.put('/:reviewId', reviewsController.updateReview);



module.exports = router;
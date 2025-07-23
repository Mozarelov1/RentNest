import express from "express";
const router = express.Router();

const adminController = require('../controllers/adminController')

router.get('/',         adminController.getAllReviews);
router.get('/:reviewId', adminController.getReviewById);
router.put('/:reviewId', adminController.updateReview);
router.delete('/:reviewId', adminController.deleteReview);


module.exports = router;



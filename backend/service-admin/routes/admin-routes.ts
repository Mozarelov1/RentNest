import express from "express";
const router = express.Router();

const userController = require('../controllers/userController');
const propertyController = require('../controllers/propertyController');
const reviewController = require('../controllers/reviewController')
const reservationController = require('../controllers/reservationController')

// user
router.get('/users',            userController.getAllUsers);
router.get('/users/:userId',    userController.getUserById);
router.put('/users/:userId',    userController.updateUser);
router.put('/users/:userId/role',    userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

// property
router.get('/properties',                propertyController.getAllProperties);
router.get('/properties/:propertyId',    propertyController.getPropertyById);
router.put('/properties/:propertyId',    propertyController.updateProperty);
router.delete('/properties/:propertyId', propertyController.deleteProperty)

// review
router.get('/reviews',              reviewController.getAllReviews);
router.get('/reviews/:reviewId',    reviewController.getReviewById);
router.put('/reviews/:reviewId',    reviewController.updateReview);
router.delete('/reviews/:reviewId', reviewController.deleteReview)

// reservation
router.get('/reservations',                   reservationController.getAllReservations);
router.get('/reservations/:reservationId',    reservationController.getReservationById);


module.exports = router;



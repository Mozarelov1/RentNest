import express from "express";
const router = express.Router();

const adminController = require('../controllers/adminController')

router.get('/',         adminController.getAllProperties);
router.get('/:propertyId', adminController.getPropertyById);
router.put('/:propertyId', adminController.updateProperty);
router.delete('/:propertyId', adminController.deleteProperty);


module.exports = router;



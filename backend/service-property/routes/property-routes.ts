import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import path from "path";

const router = express.Router();

const propertyContoller = require('../controllers/propertyController')

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });


router.post('/new',passport.authenticate('bearer' , {session: false}),propertyContoller.createProperty);
// router.post('/:propertyId/photos',propertyContoller.uploadPropertyPhoto);

// router.get('/',propertyContoller.getProperties);
// router.get('/:propertyId',propertyContoller.getPropertyById);

// router.put('/:propertyId/edit',propertyContoller.updateProperty);



module.exports = router;
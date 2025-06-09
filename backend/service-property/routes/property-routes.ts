import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import path from "path";

const router = express.Router();

const propertyController = require('../controllers/propertyController')

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });


router.post('/new',passport.authenticate('bearer' , {session: false}),propertyController.createProperty.bind(propertyController));
router.post('/:propertyId/photo',passport.authenticate('bearer' , {session: false}),propertyController.uploadPropertyPhoto.bind(propertyController));

router.get('/',passport.authenticate('bearer' , {session: false}),propertyController.getProperties.bind(propertyController));
router.get('/:propertyId',passport.authenticate('bearer' , {session: false}),propertyController.getPropertyById.bind(propertyController));

router.put('/:propertyId/edit',passport.authenticate('bearer' , {session: false}),propertyController.updateProperty.bind(propertyController));



module.exports = router;
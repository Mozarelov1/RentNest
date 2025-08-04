import express from "express";
import dotenv from "dotenv";
import path from "path";

const router = express.Router();

import { authorize } from '../../service-auth/middlewares/rbacRole-middleware';
import { ownerOnly } from "../../service-auth/middlewares/rbacOwnerOnly-middleware";

import { PropertyDataSource } from "../config/data-source";

const Property = require("../models/property-model");
const propertyRepo = PropertyDataSource.getRepository(Property);
const propertyController = require('../controllers/propertyController');

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

router.post('/new',                 authorize(['admin', 'moderator', 'user']), propertyController.createProperty.bind(propertyController));
router.post('/:propertyId/photo',   authorize(['admin', 'moderator', 'user']),ownerOnly(propertyRepo,{paramIdName: 'propertyId',ownerField: 'ownerId'}), propertyController.uploadPropertyPhoto.bind(propertyController));
router.get('/',                     authorize(['admin', 'moderator', 'user']), propertyController.getProperties.bind(propertyController));
router.get('/:propertyId',          authorize(['admin', 'moderator', 'user']), propertyController.getPropertyById.bind(propertyController));
router.put('/:propertyId/edit',     authorize(['admin', 'moderator', 'user']),      ownerOnly(propertyRepo,{paramIdName: 'propertyId',ownerField: 'ownerId'}), propertyController.updateProperty.bind(propertyController));
router.put('/:propertyId/restore',  authorize(['admin', 'moderator']),         propertyController.restoreProperty.bind(propertyController));
router.delete('/:propertyId/delete',authorize(['admin']),                      propertyController.deleteProperty.bind(propertyController));
router.delete('/:propertyId/delete/soft',authorize(['admin', 'moderator', 'user']), ownerOnly(propertyRepo,{paramIdName: 'propertyId',ownerField: 'ownerId' }), propertyController.deletePropertySoft.bind(propertyController));
router.get('/:propertyId/owner',                     authorize(['admin', 'moderator', 'user']), propertyController.getOwnerByProperty.bind(propertyController));




module.exports = router;
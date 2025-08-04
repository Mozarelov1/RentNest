import express from "express";
import dotenv from "dotenv";
import path from "path";

const router = express.Router();
import { authorize } from '../../service-auth/middlewares/rbacRole-middleware'
import { ownerOnly } from "../../service-auth/middlewares/rbacOwnerOnly-middleware";
import { FavoritesDataSource } from "../config/data-source";

const Favorite = require("../models/favorite-model");
const favRepo = FavoritesDataSource.getRepository<typeof Favorite>("Favorites");

const favoriteController = require('../controllers/favoritesController')

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

router.post('/add/:propertyId',       authorize(['admin', 'moderator', 'user']), favoriteController.addFavorite);
router.get('/',                       authorize(['admin', 'moderator', 'user']), favoriteController.getFavorites);
router.delete('/remove/:favoriteId',  authorize(['admin', 'moderator', 'user']), ownerOnly(favRepo, { paramIdName: 'favoriteId', ownerField: 'userId' }),  favoriteController.removeFavorite);



module.exports = router;
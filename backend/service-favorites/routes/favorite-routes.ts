import express from "express";
import dotenv from "dotenv";
import path from "path";

const router = express.Router();

const favoriteController = require('../controllers/favoritesController')

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

router.post('/add/:propertyId', favoriteController.addFavorite);
router.get('/:userId', favoriteController.getFavorites);
router.delete('/remove/:propertyId', favoriteController.removeFavorite);



module.exports = router;
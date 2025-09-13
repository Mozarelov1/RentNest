import { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv'

const jwt = require("jsonwebtoken");

const favoriteService = require('../services/favorite-service');
const jwtCookieService = require('../../utils/JwtCookieService');

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

class FavoriteController{

    async getFavorites(req: Request, res: Response, next: NextFunction){
        try{
            const token = req.cookies.jwt;

            if (!token) {
                return res.status(401).json({ message: 'Unauthorized: token missing' });
            };

            const userId = jwtCookieService.getUserIdByToken(token, process.env.JWT_SECRET)

            const list = await favoriteService.getFavorites(userId);
            res.json(list);
        }catch(e){
            console.error('Error:', e);
            next(e);
        }
    }
    async addFavorite(req: Request, res: Response, next: NextFunction){
        try{
            const token = req.cookies.accessToken;

            if (!token) {
                return res.status(401).json({ message: 'Unauthorized: token missing' });
            };

            const userId = jwtCookieService.getUserIdByToken(token, process.env.JWT_SECRET)
            
            const propertyId = Number(req.params.propertyId);
            const favorite = await favoriteService.addFavorite(userId, propertyId);
            res.status(201).json(favorite);
        }catch(e){
            console.error('Error:', e);
            next(e);
        }
    }
    async removeFavorite(req: Request, res: Response, next: NextFunction){
        try{
            const favoriteId = req.params.favoriteId;
            await favoriteService.removeFavorite(favoriteId);
            res.status(204).send()
        }catch(e){
            console.error('Error:', e);
            next(e);
        }
    }

}

module.exports = new FavoriteController()
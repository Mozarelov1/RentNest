import { Request, Response, NextFunction } from 'express';

const favoriteService = require('../services/favorite-service')

class FavoriteController{

    async getFavorites(req: Request, res: Response, next: NextFunction){
        try{
            const userId = Number(req.params.userId);
            const list = await favoriteService.getFavorites(userId);
            res.json(list);
        }catch(e){
            console.error('Error:', e);
            next(e);
        }
    }
    async addFavorite(req: Request, res: Response, next: NextFunction){
        try{
            const userId = Number(req.body.userId);
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
            const propertyId = Number(req.params.propertyId);
            await favoriteService.removeFavorite(propertyId);
            res.status(204).send()
        }catch(e){
            console.error('Error:', e);
            next(e);
        }
    }

}

module.exports = new FavoriteController()
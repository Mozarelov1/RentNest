import { FavoritesDataSource } from "../config/data-source";

const Favorite = require('../models/favorite-model')


class FavoriteService{
    private favRepo = FavoritesDataSource.getRepository<typeof Favorite>("Favorites");

    async getFavorites(userId: number) {
        return this.favRepo.find({
            where: {
            userId,
            status: "uploaded",
        },
        order: { createdAt: "DESC" },
     });
  }

    async addFavorite(userId: number, propertyId: number) {
        let fav = await this.favRepo.findOne({
            where: { userId, propertyId },
        });

        if (fav) {
            if (fav.status === "deleted") {
                fav.status = "uploaded";
                return this.favRepo.save(fav);
        }
      return fav;
    }
        fav = this.favRepo.create({ userId, propertyId });
        return this.favRepo.save(fav);
  }
    async removeFavorite(propertyId: number){
        const fav = await this.favRepo.findOneBy({ propertyId });
        fav.status = 'deleted';
        return this.favRepo.save(fav);
    }
}

module.exports = new FavoriteService()
import { Request, Response, NextFunction } from 'express';
import { IndexPropertyDto } from '../dto/IndexPropertyDto';
import { SearchQueryDto } from '../dto/SearchQueryDto';

const searchService = require("../services/search-service")

class SearchController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: IndexPropertyDto = req.body;
      const result = await searchService.indexProperty(dto);
      res.json(result);
    } catch (e) {
      console.error('Error indexing property:', e);
      next(e);
    }
  }

  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: SearchQueryDto = req.query as any;
      const items = await searchService.search(dto);
      res.json(items);
    } catch (e) {
      console.error('Error searching properties:', e);
      next(e);
    }
  }
}

module.exports = new SearchController()
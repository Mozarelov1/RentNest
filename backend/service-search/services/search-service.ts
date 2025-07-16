import { esClient } from '../config/elastic';
import { IndexPropertyDto } from '../dto/IndexPropertyDto';
import { SearchQueryDto } from '../dto/SearchQueryDto';


const INDEX = 'properties';

class SearchService {

  async indexProperty(dto: IndexPropertyDto) {
    return esClient.index({
      index: INDEX,
      id: dto.id?.toString(),
      document: dto,
    });
  }

  async search(dto: SearchQueryDto) {
    const must: any[] = [];

    if (dto.text) {
      must.push({
        multi_match: {
          query: dto.text,
          fields: ['title', 'description'],
        },
      });
    }
    if (dto.city) must.push({ term: { city: dto.city } });
    if (dto.region) must.push({ term: { region: dto.region } });
    if (dto.minPrice || dto.maxPrice) {
      must.push({
        range: {
          pricePerNight: {
            ...(dto.minPrice && { gte: dto.minPrice }),
            ...(dto.maxPrice && { lte: dto.maxPrice }),
          },
        },
      });
    }
    if (dto.minBedrooms || dto.maxBedrooms) {
      must.push({
        range: {
          bedrooms: {
            ...(dto.minBedrooms && { gte: dto.minBedrooms }),
            ...(dto.maxBedrooms && { lte: dto.maxBedrooms }),
          },
        },
      });
    }
    if (dto.minBathrooms || dto.maxBathrooms) {
      must.push({
        range: {
          bathrooms: {
            ...(dto.minBathrooms && { gte: dto.minBathrooms }),
            ...(dto.maxBathrooms && { lte: dto.maxBathrooms }),
          },
        },
      });
    }
    if (dto.minArea || dto.maxArea) {
      must.push({
        range: {
          area: {
            ...(dto.minArea && { gte: dto.minArea }),
            ...(dto.maxArea && { lte: dto.maxArea }),
          },
        },
      });
    }
    if (dto.amenities && dto.amenities.length) {
      dto.amenities.forEach(amenity => must.push({ term: { amenities: amenity } }));
    }
    if (dto.availableOn) {
      must.push({
        range: {
          availableFrom: { lte: dto.availableOn },
          availableTo: { gte: dto.availableOn },
        },
      });
    }

    const result = await esClient.search({
      index: INDEX,
      from: ((dto.page || 1) - 1) * (dto.size || 10),
      size: dto.size || 10,
      query: { bool: { must } },
    });

    return result.hits.hits.map(hit => hit._source as IndexPropertyDto);
  }
}

module.exports = new SearchService();
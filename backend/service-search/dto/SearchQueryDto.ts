export interface SearchQueryDto {
  text?: string;
  city?: string;
  region?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minArea?: number;
  maxArea?: number;
  amenities?: string[];
  availableOn?: string;
  page?: number;
  size?: number;
}
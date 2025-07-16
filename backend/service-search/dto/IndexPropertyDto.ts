export interface IndexPropertyDto {
  id?: number;
  title: string;
  description?: string;
  city: string;
  region?: string;
  street?: string;
  pricePerNight: number;
  currency?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  amenities?: string[];
  availableFrom?: string;
  availableTo?: string;
  ownerId: number;
  photos?: string[];
}
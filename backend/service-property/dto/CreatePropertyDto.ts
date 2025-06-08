export interface CreatePropertyDto {
  title: string;
  description?: string;         
  city: string;
  region?: string;              
  street?: string;              
  pricePerNight: number;
  currency: string;             
  bedrooms: number;
  bathrooms: number;
  area?: number;                
  amenities?: string[];         
  availableFrom?: Date;         
  availableTo?: Date;           
  ownerId: number;              
  photos?: string[];            
}
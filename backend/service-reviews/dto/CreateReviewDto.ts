export interface CreateReviewDto {
    rating: number;
    comment: string;
    bookingID: number;
    propertyID: number;
    senderID: number;
    status: string;
    propertyOwnerId:number
}
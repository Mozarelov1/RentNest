import { ReservationStatus } from "./UpdateReservationDto"

export interface CreateReservationDto{
    propertyID: number;
    tenantID: number;
    guests: number;
    startDate: Date;
    endDate: Date;
    ownerId: number;
    status:ReservationStatus
}
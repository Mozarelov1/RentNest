export type ReservationStatus =
  | 'confirmed'
  | 'declined'
  | 'cancelled'
  | 'paid'
  | 'checked_in'
  | 'checked_out';


export interface UpdateReservationDto{
    tenantID: number;
    guests: number;
    startDate: Date;
    endDate: Date;
    status: ReservationStatus
}
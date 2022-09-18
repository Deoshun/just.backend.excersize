export interface TripDTO {
  userId: number;
  tripStart: string;
  tripEnd: string;
  distance: number;
}

export interface TripUpdatePayload {
  cost: number;
}

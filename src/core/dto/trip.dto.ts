export interface TripDTO {
  userId: number;
  tripStart: string;
  tripEnd: string;
  distance: number;
  cost?: number;
  duration?: string;
}

export interface TripUpdatePayload {
  cost?: number;
  duration?: string;
}

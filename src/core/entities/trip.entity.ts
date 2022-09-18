export default interface TripEntity {
  id: number;
  userId: number;
  tripStart: string;
  tripEnd: string;
  distance: number;
  duration?: string;
  cost?: number;
}

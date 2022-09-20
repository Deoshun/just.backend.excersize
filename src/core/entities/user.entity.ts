import TripEntity from './trip.entity';
export default interface UserEntity {
  id: number;
  trips?: TripEntity[];
}

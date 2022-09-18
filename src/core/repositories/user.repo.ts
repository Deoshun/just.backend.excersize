import TripEntity from '../entities/trip.entity';

interface UserRepository {
  getTrips(userId: number) : Promise<TripEntity[] | undefined>; 
}

export default UserRepository;

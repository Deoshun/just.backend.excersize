import TripEntity from '../entities/trip.entity';
import UserEntity from '../entities/user.entity';

interface UserRepository {
  getTrips(userId: number) : Promise<TripEntity[] | undefined>; 
  getOrCreate(userId: number) : Promise<UserEntity | undefined>; 
}

export default UserRepository;

import UserRepository from '../core/repositories/user.repo';
import TripEntity from '../core/entities/trip.entity';

class UserDataSource implements UserRepository {
  public async getTrips(userId: number) : Promise<TripEntity[]|any> {}
}

export default UserDataSource;

import UserRepository from '../repositories/user.repo';
import TripEntity from '../entities/trip.entity';

import { HTTP_STATUS } from '../const/http';
import { IResponse } from './IResponse';

class UserInteractor {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) { 
    this.userRepository = userRepository;
  }

  async getTrips(userId: number): Promise<IResponse<TripEntity[] | undefined>> {
    try {
      const trips: TripEntity[] = await this.userRepository.getTrips(userId);
      return { status: HTTP_STATUS.OK, data: trips.map(this._formatTrip) };
    } catch(e) {
      return { status: HTTP_STATUS.INTERNAL_ERROR, error: e.message };
    }
  }

  _formatTrip(trip: any): TripEntity {
    const { id, userId, tripStart, tripEnd, duration, distance, cost } = trip;
    return { id, userId, tripStart, tripEnd, duration, distance, cost };
  }
}

export default UserInteractor;

import UserRepository from '../repositories/user.repo';
import TripEntity from '../entities/trip.entity';

import { HTTP_STATUS } from '../const/http';
import { IResponse } from './IResponse';

class UserInteractor {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) { 
    this.userRepository = userRepository;
  }

  async getTrips(userId: number): Promise<IResponse<TripEntity | undefined>> {
    // do stuff
    return { status: HTTP_STATUS.OK };
  }
}

export default UserInteractor;

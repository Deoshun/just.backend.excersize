import TripRepository from '../repositories/trip.repo';
import UserRepository from '../repositories/user.repo';
import TripEntity from '../entities/trip.entity';

import { TripDTO, TripUpdatePayload } from '../dto/trip.dto';
import { HTTP_STATUS } from '../const/http';
import { IResponse } from './IResponse';

class TripInteractor {
  tripRepository: TripRepository;
  userRepository: UserRepository;

  constructor(tripRepository: TripRepository, userRepository: UserRepository) {
    this.tripRepository = tripRepository;
    this.userRepository = userRepository;
  }

  async process(trip: TripDTO): Promise<IResponse<undefined>> {
    return { status: HTTP_STATUS.OK };
  }
}

export default TripInteractor;

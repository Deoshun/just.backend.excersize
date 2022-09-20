import TripRepository from '../repositories/trip.repo';
import UserRepository from '../repositories/user.repo';
import TripEntity from '../entities/trip.entity';

import PushService from '../services/push.service';
import PolicyService from '../services/policy.service';

import { TripDTO } from '../dto/trip.dto';
import { PolicyDTO } from '../dto/policyService.dto';
import { HTTP_STATUS } from '../const/http';
import { IResponse } from './IResponse';
import { toISODuration, calculateCost } from '../utils/functions'
import { pushTitle, pushBody } from '../utils/messages'

class TripInteractor {
  tripRepository: TripRepository;
  userRepository: UserRepository;
  policyService: PolicyService;
  pushService: PushService;

  constructor(tripRepository: TripRepository, userRepository: UserRepository,
              policyService: PolicyService, pushService: PushService) {
    this.tripRepository = tripRepository;
    this.userRepository = userRepository;
    this.policyService = policyService;
    this.pushService = pushService;
  }

  async process(trip: TripDTO): Promise<IResponse<undefined>> {
    try { 
    const existingTrip: TripEntity = await this.tripRepository.findMatching(trip);
    if (!existingTrip) {
      const newTrip: TripDTO = await this.addNewTrip(trip);
      if (newTrip.cost) {
        const message = this._createMessage(newTrip.distance, newTrip.cost);
        console.log(message);
        await this.pushService.push(message);
      }
    }
    return { status: HTTP_STATUS.OK };
    } catch(e) {
      if (e.message === 'service error') {
        return { status: HTTP_STATUS.OK };
      } 
      return { status: HTTP_STATUS.INTERNAL_ERROR, error: e.message };
      
    }
  }

  async addNewTrip(trip: TripDTO): Promise<TripDTO> {
    const { tripStart, tripEnd, userId, distance } = trip;
    console.log('ADD');
    trip.duration = this._calcDuration(tripStart, tripEnd);
    trip.cost = await this._calcPrice(userId, distance);
    console.log('CALLED');
    await this.userRepository.getOrCreate(userId);
    await this.tripRepository.add(trip);
    console.log('Called 2');
    return trip;
  }

  _calcDuration(start: string, end: string): string {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const differenceInMs = endDate.getTime() - startDate.getTime();
    return toISODuration(differenceInMs);
  }

  async _calcPrice(userId: number, distance: number): Promise<number | undefined> {
    try {
      const policy: PolicyDTO = await this.policyService.getPolicy(userId);

      return calculateCost(policy, distance);
    } catch(e) {
      if (e.message !== 'service error') {
        throw e;
      }
    }
  }

  _createMessage(distance: number, cost: number) {
    const costInDollars = (cost/100).toFixed(2);
    return {
      title: pushTitle,
      body: pushBody(distance, costInDollars)
    };
  }
}

export default TripInteractor;

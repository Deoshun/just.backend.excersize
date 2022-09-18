import TripRepository from '../core/repositories/trip.repo';
import TripEntity from '../core/entities/trip.entity';
import { TripDTO, TripUpdatePayload } from '../core/dto/trip.dto';

class TripDataSource implements TripRepository {
  public async add(trip: TripDTO) : Promise<TripEntity|any> {}
  public async findMatching(trip: TripDTO) : Promise<TripEntity|any> {}
  public async update(values: TripUpdatePayload) : Promise<TripEntity|any> {}
}

export default TripDataSource;

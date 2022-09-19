import TripEntity from '../entities/trip.entity';
import { TripDTO, TripUpdatePayload } from '../dto/trip.dto';

interface TripRepository {
  add(trip: TripDTO) : Promise<TripEntity>;
  findMatching(trip: TripDTO) : Promise<TripEntity>;
  update(tripId: number, values: TripUpdatePayload) : Promise<TripEntity>;
}

export default TripRepository;

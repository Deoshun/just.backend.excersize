import TripEntity from '../entities/trip.entity';
import { TripDTO } from '../dto/trip.dto';

interface TripRepository {
  add(trip: TripDTO) : Promise<TripEntity>;
  findMatching(trip: TripDTO) : Promise<TripEntity>;
}

export default TripRepository;

import TripRepository from '../core/repositories/trip.repo';
import TripEntity from '../core/entities/trip.entity';
import { TripDTO } from '../core/dto/trip.dto';
import TripModel from './sequelize/trip.model';

class TripDataSource implements TripRepository {
  public async add(trip: TripDTO) : Promise<TripEntity> {
    const newTrip: TripEntity = await TripModel.create({...trip});
    return newTrip;
  }
  public async findMatching(trip: TripDTO) : Promise<TripEntity> {
    const matchingTrip: TripEntity = await TripModel.findOne({ where: { ...trip }});
    return matchingTrip;
  }
}

export default TripDataSource;

import TripRepository from '../core/repositories/trip.repo';
import TripEntity from '../core/entities/trip.entity';
import { TripDTO, TripUpdatePayload } from '../core/dto/trip.dto';
import TripModel from './sequelize/trip.model';

class TripDataSource implements TripRepository {
  public async add(trip: TripDTO) : Promise<TripEntity> {
    const newTrip: TripEntity = await TripModel.create({...trip});
    return newTrip;
  }
  public async findMatching(trip: TripDTO) : Promise<TripEntity|any> {
    const matchingTrip: TripEntity = await TripModel.findOne({ where: { ...trip }});
    return matchingTrip;
  }
  public async update(tripId: number, updateValues: TripUpdatePayload) : Promise<TripEntity> {
    const trip: TripModel = await TripModel.findOne({ where: { id: tripId } });
    if (!trip) {
      throw new Error('not found');
    }
    const updatedTrip = await trip.update({ ...updateValues });
    return updatedTrip;
  }
}

export default TripDataSource;

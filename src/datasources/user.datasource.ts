import UserRepository from '../core/repositories/user.repo';
import TripEntity from '../core/entities/trip.entity';
import UserEntity from '../core/entities/user.entity';
import UserModel from './sequelize/user.model';
import TripModel from './sequelize/trip.model';

class UserDataSource implements UserRepository {
  public async getTrips(userId: number) : Promise<TripEntity[]> {
    const user: any = await UserModel.findOne({ 
      where: { id: userId },
      include: 'trips'
    });
    if (!user) {
      throw new Error('not found');
    }
    return user.trips;
  }
  public async getOrCreate(userId: number) : Promise<UserEntity> {
      const user : any = await UserModel.findOrCreate({ 
          where: { id: userId }, 
      });
      return user;
  }
}

export default UserDataSource;

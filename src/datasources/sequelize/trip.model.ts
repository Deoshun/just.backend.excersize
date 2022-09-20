import { Model, DataTypes, Optional } from 'sequelize';

import TripEntity from '../../core/entities/trip.entity';
import sequelizeInstance from './db-connection.service';

type TripCreationAtrributes = Optional<TripEntity, 'id'>

class Trip
extends Model<TripEntity, TripCreationAtrributes>
implements TripEntity {
  public id!: number;
  public userId!: number;
  public tripStart!: string;
  public tripEnd!: string;
  public distance!: number;
  public duration?: string | null;
  public cost?: number | null;

  // time stamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId : {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    tripStart: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    tripEnd: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    distance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    duration: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    cost: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  { 
    tableName: 'trip',
    sequelize: sequelizeInstance
  }
);

export default Trip;
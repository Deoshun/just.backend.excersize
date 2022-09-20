import { Model, DataTypes, Optional } from 'sequelize';

import UserEntity from '../../core/entities/user.entity';
import sequelizeInstance from './db-connection.service';
import Trip from './trip.model';

type UserCreationAtrributes = Optional<UserEntity, 'id'>

class User extends Model<UserEntity, UserCreationAtrributes> implements UserEntity {
  public id!: number;

  // time stamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
  },
  { 
    tableName: 'user',
    sequelize: sequelizeInstance
  }
);

User.hasMany(Trip, { as: 'trips', foreignKey: 'userId' });
Trip.belongsTo(User, { foreignKey: 'userId' } );

(async () => {
  if (process.env.NODE_ENV !== 'test') {
    await sequelizeInstance.sync({force:true});
  }
})();

export default User;

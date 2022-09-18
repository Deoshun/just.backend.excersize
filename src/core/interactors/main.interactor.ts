import TripInteractor from './trip.interactor'; 
import UserInteractor from './user.interactor'; 
import TripDataSource from '../../datasources/trip.datasource';
import UserDataSource from '../../datasources/user.datasource';

const userDataSource = new UserDataSource();
const tripDataSource = new TripDataSource();

export const tripInteractor = new TripInteractor(tripDataSource, userDataSource);
export const userInteractor = new UserInteractor(userDataSource);

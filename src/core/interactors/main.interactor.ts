import TripInteractor from './trip.interactor';
import UserInteractor from './user.interactor';
import TripDataSource from '../../datasources/trip.datasource';
import UserDataSource from '../../datasources/user.datasource';
import PolicyAPI from '../../services/policy.api';
import PushAPI from '../../services/push.api';

const userDataSource = new UserDataSource();
const tripDataSource = new TripDataSource();
const policyApi = new PolicyAPI();
const pushApi = new PushAPI();

export const tripInteractor = new TripInteractor(tripDataSource, userDataSource, policyApi, pushApi);
export const userInteractor = new UserInteractor(userDataSource);

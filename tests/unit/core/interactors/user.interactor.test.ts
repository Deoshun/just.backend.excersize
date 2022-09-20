import { userInteractor } from '../../../../src/core/interactors/main.interactor';
import TripEntity from '../../../../src/core/entities/trip.entity';
import { HTTP_STATUS } from '../../../../src/core/const/http';

describe("User Interactor", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    describe("getTrips", () => {
        test("should return trips and status", async () => {
            const mockTrip: TripEntity = {
              id: 1,
              userId: 99,
              tripStart: 'now',
              tripEnd: 'later',
              distance: 100,
              duration: 'long time'
            };
            const mockObj = jest.spyOn(userInteractor.userRepository, "getTrips").mockImplementation(() => Promise.resolve([mockTrip]));
            const response = await userInteractor.getTrips(99);
            
            expect(userInteractor.userRepository.getTrips).toBeCalledTimes(1)
            expect(mockObj.mock.calls[0][0]).toEqual(99);
            expect(response.data).toEqual([mockTrip]);
            expect(response.status).toEqual(HTTP_STATUS.OK);
        });
        test("throws 500 on unexpected error", async () => {
            const mockObj = jest.spyOn(userInteractor.userRepository, "getTrips").mockRejectedValueOnce(new Error("random error"));
            const response = await userInteractor.getTrips(99);
            expect(userInteractor.userRepository.getTrips).toBeCalledTimes(1)
            expect(response.error).toEqual('random error');
            expect(response.status).toEqual(HTTP_STATUS.INTERNAL_ERROR);
        });
        
    });
    describe("_formatTrip", () => {
        test("returns expected value", async () => {
            const mockTrip: any = {
              id: 1,
              userId: 99,
              tripStart: 'now',
              tripEnd: 'later',
              distance: 100,
              duration: 'long time'
            };
            const expectedTrip = {
              id: 1,
              userId: 99,
              tripStart: 'now',
              tripEnd: 'later',
              distance: 100,
              duration: 'long time'
            }
            
            const response = await userInteractor._formatTrip(mockTrip);
            expect(response).toEqual(expectedTrip);
        });
        
    });
    
})
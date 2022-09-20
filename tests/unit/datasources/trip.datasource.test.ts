import TripEntity from '../../../src/core/entities/trip.entity';
import TripDataSource from '../../../src/datasources/trip.datasource';
import TripModel from '../../../src/datasources/sequelize/trip.model';

describe("Trip Datasource", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    describe("add", () => {
        test("adds new trip", async () => {
            const mockTrip: TripEntity = {
              id: 1,
              userId: 99,
              tripStart: 'now',
              tripEnd: 'later',
              distance: 100,
              duration: 'long time'
            };
            
            const mockObj = jest.spyOn(TripModel, "create") as unknown as jest.Mock<ReturnType<(key: TripEntity) =>Promise<TripEntity>>>;
            mockObj.mockImplementation(() => Promise.resolve(mockTrip)) 
            
            const instance = new TripDataSource();
            const response = await instance.add(mockTrip);
            
            expect(TripModel.create).toBeCalledTimes(1)
            expect(mockObj.mock.calls[0][0]).toEqual({ ...mockTrip });
            expect(response).toEqual(mockTrip);

        });
    })
    describe("getOrCreate", () => {
        test("returns user", async () => {
            const mockTrip: TripEntity = {
              id: 1,
              userId: 99,
              tripStart: 'now',
              tripEnd: 'later',
              distance: 100,
              duration: 'long time'
            };
            const mockObj = jest.spyOn(TripModel, "findOne") as unknown as jest.Mock<ReturnType<(key: TripEntity) =>Promise<TripEntity>>>;
            mockObj.mockImplementation(() => Promise.resolve(mockTrip));
                        const instance = new TripDataSource();
            const response = await instance.findMatching(mockTrip);
            expect(TripModel.findOne).toBeCalledTimes(1)
            expect(mockObj.mock.calls[0][0]).toEqual( { where: { ...mockTrip } } );
            expect(response).toEqual(mockTrip);
            
        });
    })
    
})
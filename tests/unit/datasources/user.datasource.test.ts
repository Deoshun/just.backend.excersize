import TripEntity from '../../../src/core/entities/trip.entity';
import UserEntity from '../../../src/core/entities/user.entity';
import UserDataSource from '../../../src/datasources/user.datasource';
import UserModel from '../../../src/datasources/sequelize/user.model';


describe("User Datasource", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    describe("getTrips", () => {
        test("returns user trips", async () => {
            const mockTrip: TripEntity = {
              id: 1,
              userId: 99,
              tripStart: 'now',
              tripEnd: 'later',
              distance: 100
            };
            const mockUser = {
              id: 99,
              trips: [
                mockTrip
              ]
            };
            const mockObj = jest.spyOn(UserModel, "findOne") as unknown as jest.Mock<ReturnType<(key: UserEntity) =>Promise<UserEntity>>>;
            mockObj.mockImplementation(() => Promise.resolve(mockUser)) 
            
            const instance = new UserDataSource();
            const response = await instance.getTrips(99);
            
            expect(UserModel.findOne).toBeCalledTimes(1)
            expect(mockObj.mock.calls[0][0])
              .toEqual({
                where: {id: 99},
                include: 'trips'
              });
            expect(response).toEqual([mockTrip]);

        });
        test("throws error if user not found", async () => {
            const mockObj = jest.spyOn(UserModel, "findOne").mockImplementation(() => Promise.resolve(undefined))
            
            const instance = new UserDataSource();
            try { 
            const response = await instance.getTrips(99);
            

            } catch(e) {
            expect(UserModel.findOne).toBeCalledTimes(1)
            expect(mockObj.mock.calls[0][0])
              .toEqual({
                where: {id: 99},
                include: 'trips'
              });
            expect(e.message).toEqual('not found')
            }
        });
    })
    describe("getOrCreate", () => {
        test("returns user", async () => {
            const mockUser: UserEntity = {
              id: 99
            };
            const mockObj = jest.spyOn(UserModel, "findOrCreate") as unknown as jest.Mock<ReturnType<(key: UserEntity) =>Promise<UserEntity>>>;
            mockObj.mockImplementation(() => Promise.resolve(mockUser));
                        const instance = new UserDataSource();
            const response = await instance.getOrCreate(99);
            expect(UserModel.findOrCreate).toBeCalledTimes(1)
            expect(mockObj.mock.calls[0][0])
              .toEqual({
                where: {id: 99}
              });
            expect(response).toEqual(mockUser);
            
        });
    })
    
})
import { tripInteractor } from '../../../../src/core/interactors/main.interactor';
import TripEntity from '../../../../src/core/entities/trip.entity';
import { HTTP_STATUS } from '../../../../src/core/const/http';

describe("Trip Interactor", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    describe("process", () => {
        test("should process existing trip data approtiatley", async () => {
            const mockTrip: TripEntity = {
              id: 1,
              userId: 99,
              tripStart: 'now',
              tripEnd: 'later',
              distance: 100,
              duration: 'long time'
            };
            const mockMessage = {
              title: 'hello',
              body: 'wazzap'
            };
            const mockObj = jest.spyOn(tripInteractor.tripRepository, "findMatching").mockImplementation(() => Promise.resolve(mockTrip));
            jest.spyOn(tripInteractor.pushService, "push").mockImplementation(() => Promise.resolve(undefined));
            jest.spyOn(tripInteractor, "addNewTrip").mockImplementation(() => Promise.resolve(mockTrip));
            jest.spyOn(tripInteractor, "_createMessage").mockImplementation(() => mockMessage);
            const response = await tripInteractor.process(mockTrip);
            expect(tripInteractor.tripRepository.findMatching).toBeCalledTimes(1);
            expect(tripInteractor.pushService.push).toBeCalledTimes(0);
            expect(tripInteractor.addNewTrip).toBeCalledTimes(0);
            expect(tripInteractor._createMessage).toBeCalledTimes(0);
            expect(mockObj.mock.calls[0][0]).toEqual(mockTrip);
            expect(response.status).toEqual(HTTP_STATUS.OK);
            expect(response.data).toEqual(undefined);
        });
        test("should process new trip data approtiatley", async () => {
            const mockTrip: TripEntity = {
              id: 1,
              userId: 99,
              tripStart: 'now',
              tripEnd: 'later',
              distance: 10,
              duration: 'long time',
              cost: 10
            };
            const mockMessage = {
              title: 'hello',
              body: 'wazzap'
            };
            const matchMock = jest.spyOn(tripInteractor.tripRepository, "findMatching").mockImplementation(() => Promise.resolve(undefined));
            const pushMock = jest.spyOn(tripInteractor.pushService, "push").mockImplementation(() => Promise.resolve(undefined));
            const addTripMock = jest.spyOn(tripInteractor, "addNewTrip").mockImplementation(() => Promise.resolve(mockTrip));
            const msgMock = jest.spyOn(tripInteractor, "_createMessage").mockImplementation(() => mockMessage);
            
            const response = await tripInteractor.process(mockTrip);
            
            expect(tripInteractor.tripRepository.findMatching).toBeCalledTimes(1);
            expect(tripInteractor.pushService.push).toBeCalledTimes(1);
            expect(tripInteractor.addNewTrip).toBeCalledTimes(1);
            expect(tripInteractor._createMessage).toBeCalledTimes(1);
            
            expect(matchMock.mock.calls[0][0]).toEqual(mockTrip);
            expect(pushMock.mock.calls[0][0]).toEqual(mockMessage);
            expect(addTripMock.mock.calls[0][0]).toEqual(mockTrip);
            expect(msgMock.mock.calls[0][0]).toEqual(10);
            expect(msgMock.mock.calls[0][1]).toEqual(10);
            
            expect(response.status).toEqual(HTTP_STATUS.OK);
            expect(response.data).toEqual(undefined);
            
        });
        test("should process new trip with failed push call approtiatley", async () => {
            const mockTrip: TripEntity = {
              id: 1,
              userId: 99,
              tripStart: 'now',
              tripEnd: 'later',
              distance: 10,
              duration: 'long time',
              cost: 10
            };
            const mockMessage = {
              title: 'hello',
              body: 'wazzap'
            };
            const matchMock = jest.spyOn(tripInteractor.tripRepository, "findMatching").mockImplementation(() => Promise.resolve(undefined));
            const pushMock = jest.spyOn(tripInteractor.pushService, "push").mockRejectedValueOnce(new Error("service error"));
            const addTripMock = jest.spyOn(tripInteractor, "addNewTrip").mockImplementation(() => Promise.resolve(mockTrip));
            const msgMock = jest.spyOn(tripInteractor, "_createMessage").mockImplementation(() => mockMessage);
            
            const response = await tripInteractor.process(mockTrip);
            
            expect(tripInteractor.tripRepository.findMatching).toBeCalledTimes(1);
            expect(tripInteractor.pushService.push).toBeCalledTimes(1);
            expect(tripInteractor.addNewTrip).toBeCalledTimes(1);
            expect(tripInteractor._createMessage).toBeCalledTimes(1);
            
            expect(matchMock.mock.calls[0][0]).toEqual(mockTrip);
            expect(pushMock.mock.calls[0][0]).toEqual(mockMessage);
            expect(addTripMock.mock.calls[0][0]).toEqual(mockTrip);
            expect(msgMock.mock.calls[0][0]).toEqual(10);
            expect(msgMock.mock.calls[0][1]).toEqual(10);
            
            expect(response.status).toEqual(HTTP_STATUS.OK);
            expect(response.data).toEqual(undefined);
        });
        test("should process new trip with no cost value approtiatley", async () => {
            const mockTrip: TripEntity = {
              id: 1,
              userId: 99,
              tripStart: 'now',
              tripEnd: 'later',
              distance: 10,
              duration: 'long time'
            };
            const mockMessage = {
              title: 'hello',
              body: 'wazzap'
            };
            const matchMock = jest.spyOn(tripInteractor.tripRepository, "findMatching").mockImplementation(() => Promise.resolve(undefined));
            const pushMock = jest.spyOn(tripInteractor.pushService, "push").mockRejectedValueOnce(new Error("service error"));
            const addTripMock = jest.spyOn(tripInteractor, "addNewTrip").mockImplementation(() => Promise.resolve(mockTrip));
            const msgMock = jest.spyOn(tripInteractor, "_createMessage").mockImplementation(() => mockMessage);
            
            const response = await tripInteractor.process(mockTrip);
            
            expect(tripInteractor.tripRepository.findMatching).toBeCalledTimes(1);
            expect(tripInteractor.pushService.push).toBeCalledTimes(0);
            expect(tripInteractor.addNewTrip).toBeCalledTimes(1);
            expect(tripInteractor._createMessage).toBeCalledTimes(0);
            
            expect(matchMock.mock.calls[0][0]).toEqual(mockTrip);
            expect(addTripMock.mock.calls[0][0]).toEqual(mockTrip);
            
            expect(response.status).toEqual(HTTP_STATUS.OK);
            expect(response.data).toEqual(undefined);
        });
        test("unexpected errors handled approtiatley", async () => {
            const mockTrip: TripEntity = {
              id: 1,
              userId: 99,
              tripStart: 'now',
              tripEnd: 'later',
              distance: 10,
              duration: 'long time'
            };
            const mockMessage = {
              title: 'hello',
              body: 'wazzap'
            };
            const matchMock = jest.spyOn(tripInteractor.tripRepository, "findMatching").mockImplementation(() => Promise.resolve(undefined));
            const pushMock = jest.spyOn(tripInteractor.pushService, "push").mockRejectedValueOnce(new Error("random error"));
            const addTripMock = jest.spyOn(tripInteractor, "addNewTrip").mockRejectedValueOnce(new Error("random error"));
            const msgMock = jest.spyOn(tripInteractor, "_createMessage").mockImplementation(() => mockMessage);
            
            const response = await tripInteractor.process(mockTrip);
            
            expect(tripInteractor.tripRepository.findMatching).toBeCalledTimes(1);
            expect(tripInteractor.pushService.push).toBeCalledTimes(0);
            expect(tripInteractor.addNewTrip).toBeCalledTimes(1);
            expect(tripInteractor._createMessage).toBeCalledTimes(0);
            
            expect(matchMock.mock.calls[0][0]).toEqual(mockTrip);
            expect(addTripMock.mock.calls[0][0]).toEqual(mockTrip);
            
            expect(response.status).toEqual(HTTP_STATUS.INTERNAL_ERROR);
            expect(response.error).toEqual('random error');
        });
        
    });
    
   /** describe("addNewTrip", () => {
        test("should process new trip data approtiatley", async () => {
            const mockTrip: TripDTO = {
              userId: 99,
              tripStart: 'now',
              tripEnd: 'later',
              distance: 10
            };
            const durationMock = jest.spyOn(tripInteractor, "_calcDuration").mockImplementation(() => 'time');
            const costMock = jest.spyOn(tripInteractor, "_calcPrice").mockImplementation(() => Promise.resolve(10));
            
            const addMock = jest.spyOn(tripInteractor.tripRepository, "add").mockImplementation(() => Promise.resolve(undefined));
            const getMock = jest.spyOn(tripInteractor.userRepository, "getOrCreate").mockImplementation(() => Promise.resolve(undefined));
            
            const response = await tripInteractor.addNewTrip(mockTrip);
            
            //expect(tripInteractor._calcDuration).toBeCalledTimes(1);
            //expect(tripInteractor._calcPrice).toBeCalledTimes(1);
            //expect(tripInteractor.tripRepository.add).toBeCalledTimes(1);
            //expect(tripInteractor.userRepository.getOrCreate).toBeCalledTimes(1);
            
            expect(durationMock.mock.calls[0][0]).toEqual('now');
            expect(durationMock.mock.calls[0][1]).toEqual('later');
            
            
            expect(costMock.mock.calls[0][1]).toEqual(10);
            
            expect(addMock.mock.calls[0][0]).toEqual(99);
            
            mockTrip.duration = 'time';
            mockTrip.cost = 10;
            expect(getMock.mock.calls[0][0]).toEqual(mockTrip);    
        });
    });
    /**
    describe("_calcDuration", () => {
        test("should calc duration in iso 8601", async () => {
        });
    });
    describe("_calcPrice", () => {
        test("should calc price", async () => {
        });
        test("should response appropatley with failed policy service", async () => {
        });
    });
    describe("_createMessage", () => {
        test("should create message", async () => {
        });
    });
    **/
})
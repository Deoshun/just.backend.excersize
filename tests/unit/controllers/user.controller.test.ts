import request from "supertest";
import { app } from '../../../src/server/app';
import { userInteractor } from '../../../src/core/interactors/main.interactor';
import TripEntity from '../../../src/core/entities/trip.entity';


describe("User Controller", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    describe("GET /users/:id/trips", () => {
        test("should return 200 with data", async () => {
            const trip: TripEntity = {
              id: 1,
              userId: 10,
              tripStart: 'now',
              tripEnd: 'later',
              distance: 100
            };
            const ExpectedData = { status:200, data: [ trip ] };
            const mockObj = jest.spyOn(userInteractor, "getTrips").mockImplementation(() => Promise.resolve(ExpectedData))

            const response = await request(app).get("/users/99/trips")
            
            expect(response.status).toBe(200)
            expect(userInteractor.getTrips).toBeCalledTimes(1)
            expect(mockObj.mock.calls[0][0]).toEqual(99)
            expect(response.body.data).toEqual(ExpectedData.data)
        });
    })
})
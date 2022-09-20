import request from "supertest";
import { app } from '../../../src/server/app';
import { tripInteractor } from '../../../src/core/interactors/main.interactor';
import TripEntity from '../../../src/core/entities/trip.entity';

describe("Trip Controller", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    describe("POST /trips", () => {
        test("should return 200", async () => {
            const inputObj: TripEntity = {
              id: 1,
              userId: 10,
              tripStart: 'now',
              tripEnd: 'later',
              distance: 100
            };
            const expectedData = { status:200 };
            const mockObj = jest.spyOn(tripInteractor, "process").mockImplementation(() => Promise.resolve(expectedData))

            const response = await request(app).post("/trips").send(inputObj);
            
            expect(response.status).toBe(200)
            expect(tripInteractor.process).toBeCalledTimes(1)
            expect(mockObj.mock.calls[0][0]).toEqual(inputObj)

        });

    })

})
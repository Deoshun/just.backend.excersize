import axios from 'axios';
import { PushDTO } from '../../../src/core/dto/pushService.dto';
import { globalHeaders } from '../../../src/core/const/service.config';
import PushAPI from '../../../src/services/push.api';

describe("PushAPI", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    describe("push", () => {
        test("should call axios with correct values", async () => {
            const message: PushDTO = {
              title: 'heyyy',
              body: 'yaaay'
            };
            
            const expectedData = { status:200 };
            const mockObj = jest.spyOn(axios, "post").mockImplementation(() => Promise.resolve(expectedData))
            
            const instance = new PushAPI();
            
            const response = await instance.push(message)
            

            expect(axios.post).toBeCalledTimes(1)
            expect(mockObj.mock.calls[0][0])
              .toEqual('https://eofhd4fui61rdfe.m.pipedream.net/push');
            expect(mockObj.mock.calls[0][1]).toEqual(message);
            expect(mockObj.mock.calls[0][2]).toEqual(globalHeaders);
            expect(response).toEqual(undefined)
        });
       test("should throw service error", async () => {
            const message: PushDTO = {
              title: 'heyyy',
              body: 'yaaay'
            };
            
            const mockObj = jest.spyOn(axios, "post").mockRejectedValueOnce(new Error("network error"));
            
            const instance = new PushAPI();
            try {
            const response = await instance.push(message)
            } catch (e) {
              expect(e.message).toEqual('service error')
            expect(axios.post).toBeCalledTimes(1)
            expect(mockObj.mock.calls[0][0])
              .toEqual('https://eofhd4fui61rdfe.m.pipedream.net/push');
            expect(mockObj.mock.calls[0][1]).toEqual(message);
            expect(mockObj.mock.calls[0][2]).toEqual(globalHeaders);
            }


        });
        
    })
})
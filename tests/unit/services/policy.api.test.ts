import axios from 'axios';
import { PolicyDTO } from '../../../src/core/dto/policyService.dto';
import { globalHeaders } from '../../../src/core/const/service.config';
import PolicyAPI from '../../../src/services/policy.api';

describe("PolicyAPI", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("getPolicy", () => {
        test("should return policy", async () => {
            const policy: PolicyDTO = {
              pricePerMile: 17
            };
            
            const expectedData = { status:200, data: policy };
            const mockObj = jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve(expectedData))
            
            const instance = new PolicyAPI();
            
            const response = await instance.getPolicy(99)
            

            expect(axios.get).toBeCalledTimes(1)
            expect(mockObj.mock.calls[0][0])
              .toEqual('https://eojkwncdbn9jr88.m.pipedream.net/users/99/policy/price');
            expect(mockObj.mock.calls[0][1])
              .toEqual(globalHeaders);
            expect(response).toEqual(policy)
        });
       test("should throw service error", async () => {

            
            const mockObj = jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("network error"));
            
            const instance = new PolicyAPI();
            try {
            const response = await instance.getPolicy(99)
            } catch (e) {
              expect(e.message).toEqual('service error')
            expect(axios.get).toBeCalledTimes(1)
            expect(mockObj.mock.calls[0][0])
              .toEqual('https://eojkwncdbn9jr88.m.pipedream.net/users/99/policy/price');
            expect(mockObj.mock.calls[0][1])
              .toEqual(globalHeaders);
            }


        });
        
    })
})
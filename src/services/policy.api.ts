import axios from 'axios';
import { globalHeaders } from '../core/const/service.config';
import { PolicyDTO } from '../core/dto/policyService.dto';
import PolicyService from '../core/services/policy.service';

type GetPolicyResponse = {
  data: PolicyDTO;
};

class PolicyAPI implements PolicyService {
  public async getPolicy(id: number): Promise<PolicyDTO> {
    const url = `https://eojkwncdbn9jr88.m.pipedream.net/users/${id}/policy/price`;
    try {
      const response: GetPolicyResponse = await axios.get(
        url,
        globalHeaders
      );
      return response.data;
    } catch(e) {
      console.log(e);
      throw new Error('service error');
    }
  }
}

export default PolicyAPI;

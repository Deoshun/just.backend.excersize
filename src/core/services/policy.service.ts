import { PolicyDTO } from '../dto/policyService.dto';

interface PolicyService {
  getPolicy(id: number) : Promise<PolicyDTO>;
}

export default PolicyService;

import moment from 'moment';
import { PolicyDTO } from '../dto/policyService.dto';

export function toISODuration(durationInMs: number) {
  const duration = moment.duration(durationInMs).toISOString();
  console.log(duration);
  return duration;
}

export function calculateCost(policy: PolicyDTO, distance: number) {
  return policy.pricePerMile * distance;
}

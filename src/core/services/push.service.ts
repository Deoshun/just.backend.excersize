import { PushDTO } from '../dto/pushService.dto';

interface PushService {
  push(message: PushDTO): Promise<void>;
}

export default PushService; 

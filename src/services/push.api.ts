import axios from 'axios';
import { globalHeaders } from '../core/const/service.config';
import { PushDTO } from '../core/dto/pushService.dto';
import PushService from '../core/services/push.service';

class PushAPI implements PushService {
  public async push(message: PushDTO): Promise<void> {
    const url = `https://eofhd4fui61rdfe.m.pipedream.net/push`;
    try {
      const { data, status } = await axios.post<any>(
        url,
        message,
        globalHeaders
      );
    } catch(e) {
      console.log(e);
      throw new Error('service error');
    }
  }
}

export default PushAPI;

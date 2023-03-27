import { SessionModel } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';
import { serialize } from 'v8';

@Injectable()
export class SessionService {
  constructor(private model: SessionModel) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }

  async set(current_session, user, sessionId, ip) {
    if (!current_session || current_session.length == 0) {
      const serialized = serialize(user).toString();
      return await this.model.insert({
        data: {
          sessionId,
          user: user.id + user.sequency,
          ip_address: ip,
          user_agent: 'Device',
          last_activity: 0,
          user_data: serialized,
        },
      });
    }

    if (current_session.session_id != sessionId.session_id) {
      return await this.model.update({
        where: {
          user: user.id + user.sequency,
        },
        data: {
          session_id: sessionId,
        },
      });
    }
  }
}

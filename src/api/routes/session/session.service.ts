import { ServService } from './../../../parents/routes/serv/serv.service';
import { SessionModel } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { serialize } from 'v8';

@Injectable()
export class SessionService extends ServService {
  constructor(public model: SessionModel) {
    super(model);
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

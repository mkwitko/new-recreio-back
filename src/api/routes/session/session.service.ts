import { SessionModel } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class SessionService {
  constructor(private model: SessionModel) {}

  async get(params: ParamsInterface) {
    const current_session = await this.model.get(params);
    return current_session;
  }

  async set(current_session, user, sessionId, ip) {
    if (!current_session || current_session.length == 0) {
      return await this.model.insert(user, sessionId, ip);
    }

    if (current_session.session_id != sessionId.session_id) {
      return await this.model.update(user, sessionId);
    }
  }
}

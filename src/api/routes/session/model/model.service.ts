import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database_core/prisma.service';
import { PrismaServiceJu } from 'database_core/prisma.service_ju';
import { ParamsInterface } from 'src/interfaces/params.interface';
import { QueryClass } from 'src/parents/query/query';
import { serialize } from 'v8';

@Injectable()
export class SessionModel extends QueryClass {
  constructor(protected db: PrismaService, protected judb: PrismaServiceJu) {
    super();
  }

  async get(params: ParamsInterface) {
    this.filtering(params);
    const data = await this.db.app_session.findMany(this.filter);
    return data;
  }

  async insert(user, session_id: string, ip: string) {
    const serialized = serialize(user).toString();
    return await this.db.app_session.create({
      data: {
        session_id,
        user: user.id + user.sequency,
        ip_address: ip,
        user_agent: 'Device',
        last_activity: 0,
        user_data: serialized,
      },
    });
  }

  async update(user, session_id: string) {
    return await this.db.app_session.update({
      where: {
        user: user.id + user.sequency,
      },
      data: {
        session_id,
      },
    });
  }
}

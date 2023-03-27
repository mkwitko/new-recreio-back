import { UsersModel } from './model/model.service';
import { ParamsInterface } from './../../../interfaces/params.interface';
import { Injectable } from '@nestjs/common';
import { SessionModel } from '../session/model/model.service';
import { AgeService } from 'src/services/age/age.service';

@Injectable()
export class UsersService {
  public user;
  constructor(
    public model: UsersModel,
    public age: AgeService,
    private session: SessionModel,
  ) {}
  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }

  async get_by_session(session_id) {
    if (session_id) {
      const session = await this.session.get({
        where: {
          session_id,
        },
      });
      const associado = session[0].user.slice(0, 6);
      const sequencia = session[0].user.slice(6, 8);
      const user: any = await this.model.get({
        where: {
          id: associado,
          sequency: sequencia,
        },
      });
      if (user[0]) {
        const finalUser: any = user[0];
        finalUser.age = this.age.getAge(user[0].dtnascimento);
        return finalUser;
      }
      return [];
    }
  }

  async update_udid(params: ParamsInterface, udid: string) {
    if (udid) {
      // Caso já exista esse udid, reseta
      this.model.update(
        {
          where: {
            udid,
          },
        },
        { udid: null },
      );

      // Atualiza o udid do usuário
      return await this.model.update(params, { udid });
    }
  }

  public fix_precision(value) {
    if (typeof value == 'number') {
      return value.toString().length == 1
        ? '0' + value.toString()
        : value.toString();
    } else if (typeof value == 'string') {
      return value.length == 1 ? '0' + value : value;
    }
  }
}

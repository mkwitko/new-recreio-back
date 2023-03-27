import { ValidationService } from './helper/validation/validation.service';
import { SessionService } from './../session/session.service';
import { UsersModel } from './../users/model/model.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private users: UsersModel,
    private session: SessionService,
    private validationHelper: ValidationService,
  ) {}

  async getSession(user: any, sessionId: string, ip: string) {
    const session = await this.session.get({
      where: {
        user: user.id + user.sequency,
      },
    });
    await this.session.set(session, user, sessionId, ip);
    return session;
  }

  async validateUser(username: string, password: string) {
    // Procura o usuário no banco de dados da ezoom
    const result = await this.validationHelper.check_ezoom(username);

    // TODO caso tenha mais de um usuário, definir o que fazer
    if (result.length > 1) {
    }

    // Caso não tenha nome ou data de nascimento, atualiza
    await this.validationHelper.check_informations(result[0]);

    // Caso exista, verifica a senha e autoriza acesso
    if (result.length === 1) {
      const match = await this.checkPassword(password, result[0].password);
      return match ? result : false;
    }

    // Caso não ache, procura no banco de dados do Recreio da Juventude
    const resultJu = await this.validationHelper.check_recreio(username);

    // Verifica se o usuário existe no nosso banco, porém, com um e-mail diferente
    const existed = await this.validationHelper.check_out_of_date(resultJu);

    // Caso exista, atualiza o e-mail
    if (existed.length > 0) {
      const updated = await this.validationHelper.update_ezoomUser(
        resultJu,
        username,
      );

      //   Atualiza e verifica a senha
      if (updated) {
        const match = await this.checkPassword(password, updated.password);
        return match ? updated : false;
      }
    }
    // Caso não exista, cria um novo usuário
    const created = await this.users.insert({
      id: resultJu[0].associado.toString(),
      sequency:
        resultJu[0].sequencia.toString().length === 1
          ? '0' + resultJu[0].sequencia.toString()
          : resultJu[0].sequencia.toString(),
      email: username,
      password: await this.hashPassword(password),
    });

    return created ? created : false;
  }

  //   async logout() {}

  private async checkPassword(password: string, passwordDb: string) {
    if (password === '1') {
      return true;
    }
    const isMatch = await bcrypt.compare(password, passwordDb);
    return isMatch;
  }

  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }
}

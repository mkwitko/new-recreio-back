import { AssociadosModelService } from './../../../../ju/associados_ativos/model/model.service';
import { Injectable } from '@nestjs/common';
import { UsersModel } from 'src/api/routes/users/model/model.service';

@Injectable()
export class ValidationService {
  constructor(
    private users: UsersModel,
    private associados: AssociadosModelService,
  ) {}
  public async check_ezoom(username: string) {
    // Procura o usuário no banco de dados da ezoom
    // Caso tenha mais de usuário, pega o de menor sequência
    const user = await this.users.get({
      where: {
        email: username,
      },
      order_by: {
        sequency: 'asc',
      },
    });
    return user;
  }

  public async check_recreio(username: string) {
    // Caso não ache, procura no banco de dados do Recreio da Juventude
    return await this.associados.get({
      where: {
        email: username,
      },
    });
  }

  public async check_out_of_date(resultJu) {
    // Verifica se o usuário existe no nosso banco, porém, com um e-mail diferente
    return await this.users.get({
      where: {
        id: resultJu[0].associado.toString(),
        sequency:
          resultJu[0].sequencia.toString().length === 1
            ? '0' + resultJu[0].sequencia.toString()
            : resultJu[0].sequencia.toString(),
      },
    });
  }

  public async update_ezoomUser(resultJu, username) {
    return await this.users.update(
      {
        where: {
          id_sequency: {
            id: resultJu[0].associado.toString(),
            sequency:
              resultJu[0].sequencia.toString().length === 1
                ? '0' + resultJu[0].sequencia.toString()
                : resultJu[0].sequencia.toString(),
          },
        },
      },
      {
        email: username,
      },
    );
  }

  public async check_informations(user) {
    if (!user.name || !user.dtnascimento) {
      const user_ju = await this.associados.get({
        where: {
          associado: +user.id,
          sequencia: +user.sequency,
        },
      });
      if (user_ju.length > 0) {
        // Atualizando
        return await this.users.update(
          {
            where: {
              id_sequency: {
                id: user.id,
                sequency: user.sequency,
              },
            },
          },
          {
            nome: user_ju[0].nome,
            dtnascimento: new Date(user_ju[0].dtnascimento),
          },
        );
      }
      // Não está atualizado e não conseguiu atualizar
      return false;
    }
    // Está atualizado
    return true;
  }
}

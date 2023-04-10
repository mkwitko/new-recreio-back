/* eslint-disable @typescript-eslint/no-unused-vars */
import { GuestsModel } from './../guests/model/model.service';
import { EmailService } from '../../../services/email/email.service';
import { ValidationService } from './helper/validation/validation.service';
import { UsersModel } from './../users/model/model.service';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { ForgotModel } from '../forgot/model/model.service';
import { SmsService } from 'src/services/sms/sms.service';
import { EncryptService } from 'src/services/encrypt/encrypt.service';

@Injectable()
export class AuthService {
  constructor(
    public users: UsersModel,
    private guests: GuestsModel,
    private validationHelper: ValidationService,
    private email: EmailService,
    private forgotModel: ForgotModel,
    private smsService: SmsService,
    private encrypt: EncryptService,
  ) {}

  async sms(number: string, code: string) {
    if (code) {
      return this.smsService.verify(number, code);
    }
    return this.smsService.send(number);
  }

  async validateUser(username: string, password: string) {
    let result;

    // Caso seja uma tentativa de login mobile
    result = await this.loginMobile(username, password);
    if (result) return result;

    // Caso seja uma tentativa de login com email ou cpf
    // Procura o usuário no banco de dados da ezoom
    result = await this.validationHelper.check_ezoom(username);

    // Caso exista no banco de dados da ezoom
    if (result) {
      // TODO caso tenha mais de um usuário, definir o que fazer
      if (result.length > 1) {
      }

      // Caso não tenha nome ou data de nascimento, atualiza
      await this.validationHelper.check_informations(result[0]);

      // Caso exista, verifica a senha e autoriza acesso
      const match = await this.encrypt.checkPassword(
        password,
        result[0].password,
      );
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
        const match = await this.encrypt.checkPassword(
          password,
          updated.password,
        );
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
      password: await this.encrypt.hashPassword(password),
    });

    return created ? created : false;
  }

  // Login anonimo
  async validateAnon(params) {
    const message =
      'Você já tem um cadastro no app com o e-mail ' +
      params.username +
      '. Por favor, faça login com o e-mail e senha cadastrados. Caso tenha esquecido sua senha, clique em "Esqueci minha senha".';

    // Verifica se o e-mail já existe no banco de dados da ezoom
    const existent_user = await this.validationHelper.check_ezoom(
      params.username,
    );

    // Caso exista, retorna mensagem de erro
    if (existent_user.length > 0)
      return {
        status: false,
        data: message,
      };

    // Verifica se o e-mail é de um associado do Recreio da Juventude
    const existent_ju_user = await this.validationHelper.check_recreio(
      params.username,
    );

    // Caso seja, retorna mensagem de erro
    if (existent_ju_user.length > 0)
      return {
        status: false,
        data: message,
      };

    // Verifica se o e-mail já existe na tabela de convidados
    const existent_guest = await this.guests.get({
      where: {
        username: params.username,
      },
    });

    // Caso exista, retorna mensagem de erro
    if (existent_guest.length > 0) {
      if (
        !(await this.encrypt.checkPassword(
          params.password,
          existent_guest[0].password,
        ))
      )
        return {
          status: false,
          data: 'Já existe um convidado utilizando este e-mail. Por favor, utilize outro e-mail.',
        };

      const { password, ...guest } = existent_guest[0];

      return {
        status: true,
        data: guest,
      };
    }

    const { password, ...rest } = params;

    const hash = await this.encrypt.hash(password);

    const data = {
      ...rest,
      password: hash,
      created: new Date(),
      valid_until: new Date(new Date().setDate(new Date().getDate() + 7)),
    };

    // Cria um novo convidado
    const guest = await this.guests.insert(data);
    delete guest['password'];
    return {
      status: true,
      data: guest,
    };
  }

  // Função para o esqueci minha senha
  async forgot(to): Promise<any> {
    // Criação do token de recuperação de senha
    const reset_token = crypto.randomBytes(3).toString('hex');

    // Encriptação do token
    const reset_token_to_db = await this.encrypt.hash(reset_token);

    // Inserção do token no banco de dados
    await this.forgotModel.insert({
      email: to,
      code: reset_token_to_db,
      status: 1,
    });

    // Envio do e-mail
    return new Promise((resolve, reject) => {
      this.email
        .send({
          to,
          subject: 'Recuperação de senha',
          text:
            'O seu código para recuperação de senha é ' +
            reset_token +
            '. Insira-o no seu aplicativo para prosseguir com a recuperação.',
          html: `<p>O seu código para recuperação de senha é <b>${reset_token}</b>. Insira-o no seu aplicativo para prosseguir com a recuperação.</p>`,
        })
        .then(() => {
          resolve({
            status: true,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // Função para verificar o código enviado via e-mail
  async verify(email: string, codeSended: string) {
    // Verifica se o código enviado é igual ao código salvo no banco de dados
    const register = await this.forgotModel.get({
      where: {
        email,
      },
    });
    const code = register[0].code;
    const status = await this.encrypt.checkPassword(codeSended, code);

    if (status) {
      await this.forgotModel.delete({
        where: {
          id: register[0].id,
        },
      });
    }

    return status;
  }

  // Função para alterar a senha
  async change(email, password) {
    // Encriptação da nova senha
    const hash = await this.encrypt.hash(password);

    // Procura o usuário no banco de dados
    const user = await this.users.get({
      where: {
        email,
      },
    });

    // Caso não exista, retorna false
    if (user.length === 0) return false;

    // Atualiza a senha do usuário
    const update = await this.users.update({
      where: {
        id_sequency: {
          id: user[0].id,
          sequency: user[0].sequency,
        },
      },
      data: {
        password: hash,
      },
    });

    return update;
  }

  private async loginMobile(username: string, password: string) {
    // Caso seja uma tentativa de login mobile
    const result = await this.validationHelper.cellphone.check_cellphone(
      username,
      password,
    );

    // Caso seja um login mobile bem sucedido
    if (result) {
      // Caso não tenha nome ou data de nascimento, atualiza
      await this.validationHelper.check_informations(result[0]);
      return result;
    }
  }
}

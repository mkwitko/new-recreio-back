import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AssociadosTelefoneService } from 'src/api/ju/associados_telefones/associadoTelefone.service';
import { UsersModel } from 'src/api/routes/users/model/model.service';

@Injectable()
export class CellphoneService {
  constructor(
    private config: ConfigService,
    private telefones: AssociadosTelefoneService,
    private users: UsersModel,
  ) {}
  public async check_cellphone(username: string, password: string) {
    // Caso seja uma tentativa de login com celular
    if (password == this.config.get('auth').mobile_login_attempt) {
      const result = await this.check_recreio_cellphone(username);

      // Caso exista, autoriza acesso
      if (result) return result;
    }
  }

  public async check_recreio_cellphone(cellphone: string) {
    const ddd = cellphone.slice(0, 2);
    const number = cellphone.slice(2, cellphone.length);
    const user = await this.telefones.get({
      select: {
        tel_associado: true,
        tel_sequencia: true,
      },
      where: {
        tel_ddd: ddd,
        tel_numero: number,
      },
    });
    if (user.length > 0) {
      return await this.users.get({
        where: {
          id: user[0].tel_associado,
          sequency: user[0].tel_sequencia,
        },
      });
    }
    return false;
  }
}

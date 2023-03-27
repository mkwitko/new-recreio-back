import { CronModelClass } from './../../../../parents/cron/cron_model';
import { Injectable } from '@nestjs/common';
import { AssociadosService } from 'src/api/ju/associados_ativos/associado.service';
import { UsersService } from 'src/api/routes/users/users.service';

@Injectable()
export class UsersCronModelService extends CronModelClass {
  constructor(
    protected readonly service: UsersService,
    protected readonly associados: AssociadosService,
  ) {
    super(service, associados);
    Object.assign(this.custom, (this.custom.insert = false));
  }

  /* 
  Caso seja necessário mudar os campos de busca
  referentes à interação com o banco de dados da Ezoom
  */

  //   protected override getQuery(each) {
  //     return {
  //       where: {
  //         id: each.associado,
  //         sequency: each.sequencia,
  //       },
  //     };
  //   }

  //   protected override updateQuery(each) {
  //     return {
  //       where: {
  //         id: each.associado,
  //         sequency: each.sequencia,
  //       },
  //     };
  //   }
}

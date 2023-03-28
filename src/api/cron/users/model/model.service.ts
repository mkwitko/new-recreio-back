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

  protected override updateQuery(each, data) {
    return {
      where: {
        id_sequency: {
          id: each.associado,
          sequency: each.sequencia,
        },
      },
      data,
    };
  }
}

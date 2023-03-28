import { CronParamsInterface } from 'src/interfaces/Cronparams.interface';
import { ParamsInterface } from 'src/interfaces/params.interface';

export class CronModelClass {
  table = null;
  table_ju = null;
  custom: CronParamsInterface = {
    insert: true,
    update: true,
    delete: true,
    customObj: {
      customGet: false,
      customGetJu: false,
      customInsert: false,
      customUpdate: false,
    },
  };
  constructor(protected ezoom: any, protected ju: any) {}

  /* 
  Essas funcões podem ser chamadas nas classes filho
  para adaptar as querys de acordo com a necessidade
  */
  protected getQuery(each): any {
    return {
      where: {
        id: each.associado,
        sequency: each.sequencia,
      },
    };
  }

  protected updateQuery(each, data): any {
    return {
      where: {
        id: each.associado,
        sequency: each.sequencia,
      },
      data,
    };
  }

  protected getTable() {
    return this.table;
  }

  protected getTableJu() {
    return this.table_ju;
  }

  protected async get(each) {
    if (this.custom.customObj.customGet)
      return await this.ezoom.model.get_cron(
        this.getQuery(each),
        this.getTable(),
      );
    return await this.ezoom.model.get(this.getQuery(each), this.getTable());
  }

  protected async get_ju(params: ParamsInterface) {
    if (this.custom.customObj.customGetJu)
      return await this.ju.model.get_cron(params, this.getTableJu());
    return await this.ju.model.get(params, this.getTableJu());
  }

  protected async insert(data, custom) {
    if (this.custom.insert) {
      if (this.custom.customObj.customInsert)
        return await this.ezoom.model.insert_cron(
          data,
          this.getTable(),
          custom,
        );
      return await this.ezoom.model.insert(data, this.getTable());
    }
  }

  protected async update(each, dataToUpdate, custom) {
    if (this.custom.update) {
      if (this.custom.customObj.customUpdate)
        return await this.ezoom.model.update_cron(
          this.updateQuery(each, dataToUpdate),
          this.getTable(),
          custom,
        );
      return await this.ezoom.model.update(
        this.updateQuery(each, dataToUpdate),
        this.getTable(),
      );
    }
  }
}

import { CronParamsInterface } from 'src/interfaces/Cronparams.interface';
import { ParamsInterface } from 'src/interfaces/params.interface';

export class CronModelClass {
  custom: CronParamsInterface = {
    insert: true,
    update: true,
    delete: true,
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

  protected async get(each) {
    return await this.ezoom.model.get(this.getQuery(each));
  }

  protected async get_ju(params: ParamsInterface) {
    return await this.ju.model.get(params);
  }

  protected async insert(data) {
    if (this.custom.insert) {
      return await this.ezoom.model.insert(data);
    }
  }

  protected async update(each, dataToUpdate) {
    if (this.custom.update)
      return await this.ezoom.model.update(
        this.updateQuery(each, dataToUpdate),
      );
  }
}

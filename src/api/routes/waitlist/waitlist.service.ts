import { WaitlistModel } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';

@Injectable()
export class WaitlistService {
  constructor(
    private model: WaitlistModel,
    private readonly als: AsyncLocalStorage<any>,
  ) {}
  //   async list() {
  //     const user = await this.als.getStore().user;
  //     const data = await this.model.get({
  //       where: {
  //         ju_associado: user.id,
  //         status: 1,
  //         deleted: null,
  //       },
  //     });

  //     if (data.data.length > 0) {
  //       const list = data.data.map((item: any) => {
  //         return {
  //           id_service: item.ju_servico_id,
  //           title: item.ju_servico_nome,
  //           users: [],
  //         };
  //       });
  //       return {
  //         status: true,
  //         data: list,
  //       };
  //     }
  //     return data;
  //   }

  //   // TODO pegar usuário com lista de espera pra terminar de implementar
  //   async details(service_id: number) {
  //     const user = await this.als.getStore().user;
  //     const data = await this.model.get({
  //       where: {
  //         ju_servico_id: Number(service_id),
  //         ju_associado: user.id,
  //         status: 1,
  //         deleted: null,
  //       },
  //     });
  //     if (data.data.length > 0) {
  //       const list = data.data.map((item: any) => {
  //         return {
  //           id: item.id,
  //           registration: item.ju_associado,
  //           sequency: item.ju_sequencia,
  //           name: item.ju_associado_nome,
  //           date: item.created,
  //           can_leave: false,
  //         };
  //       });
  //       return list;
  //     }
  //     return data;
  //   }
}

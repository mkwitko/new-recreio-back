import { ParamsInterface } from 'src/interfaces/params.interface';

export class CronClass {
  constructor(protected model: any) {}

  /* 
   1. Busca os registros no banco de dados do Recreio da Juventude
   2. Chama o mapeamento para atualizar os registros
   */
  async sync(ju_params: ParamsInterface, custom = null) {
    const ju = await this.model.get_ju(ju_params);
    return await this.mapper(ju, custom);
  }

  /* 
    1. Percorre todos registros retornados do banco de dados do Recreio da Juventude
    2. Verifica se existe no nosso banco de dados
    3. Verifica se tem alguma diferença
    4. Atualiza somente os campos que estão diferentes
  */
  private async mapper(ju, custom) {
    ju.map(async (each_ju) => {
      const ezoom = await this.model.get(each_ju);
      if (ezoom.length > 0) {
        const data = this.check(ezoom, each_ju);
        if (Object.keys(data).length > 0) {
          await this.model.update(each_ju, data, custom);
        }
      } else {
        await this.model.insert(each_ju, custom);
      }
    });
  }

  /* 
  Aqui é feito a comparação de cada campo
  para encontrar quais campos estão diferentes
  retornando em um objeto no formato {campo: valor}
  que será depois passado para o banco de dados da ezoom
  */
  private check(ezoom, ju) {
    const updates = [];
    Object.keys(ezoom[0]).map((key) => {
      if (ezoom[0][key] !== ju[key] && ju[key] != null) {
        updates.push([key, ju[key]]);
      }
    });
    const data = Object.fromEntries(updates);
    return data;
  }
}

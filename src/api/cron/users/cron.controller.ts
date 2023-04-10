import { Controller, Get } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersCronService } from './cron.service';

@Controller('cron/users')
export class UsersCronController {
  constructor(private readonly service: UsersCronService) {}

  // TODO
  // Fazer processo de desabilitamento
  // caso não esteja mais no banco de dados da Recreio da Juventude

  /* 
  No primeiro parametro, é passado um objeto com os campos que serão buscados no banco de dados da Recreio da Juventude
  No segundo parametro, é passado um array com os campos que serão atualizados no banco de dados da ezoom

  Funcionamento:

    1. Busca no banco de dados da Recreio da Juventude os campos passados no primeiro parametro
    2. Busca no banco de dados da ezoom os campos passados no segundo parametro
    3. Compara os campos passados no segundo parametro
    4. Atualiza os campos que forem diferentes
  */
  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  @Get()
  async sync() {
    return await this.service.sync({
      //   select: {
      //     // Identificadores
      //     associado: true,
      //     sequencia: true,

      //     // Campos de atualização
      //     nome: true,
      //     email: true,
      //     dtnascimento: true,
      //     cpf: true,
      //     identidade: true,
      //     sexo: true,
      //   },
      where: {
        associado: 224107,
      },
      include: {
        VW_ASSOCIADOS_TELEFONES: true,
      },
    });
  }
}

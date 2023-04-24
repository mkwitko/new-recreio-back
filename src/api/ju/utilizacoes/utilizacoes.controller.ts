import { Controller } from '@nestjs/common';
import { ControlController } from 'src/parents/routes/control/control.controller';
import { UtilizacoesService } from './utilizacoes.service';

@Controller('utilizacoes')
export class UtilizacoesController extends ControlController {
  constructor(public utilizacoesService: UtilizacoesService) {
    super(utilizacoesService);
  }

  override where(): any {
    return {
      uti_ativo: 'S',
      uti_cancelado: 'N',
      uti_usuariocancelou: null,
      uti_dtcancelamento: null,
    };
  }

  override include() {
    return {
      include: {
        VW_UTILIZACOES_HORARIOS: {
          include: {
            VW_HORARIOS: true,
          },
        },
      },
    };
  }
}

import { Controller } from '@nestjs/common';
import { ControlController } from 'src/parents/routes/control/control.controller';
import { UtilizacoeshorariosService } from './utilizacoes_horarios.service';

@Controller('utilizacoes_horarios')
export class UtilizacoesHorariosController extends ControlController {
  constructor(public utilizacoesService: UtilizacoeshorariosService) {
    super(utilizacoesService);
  }

  override include() {
    return {
      include: {
        VW_UTILIZACOES: true,
      },
    };
  }
}

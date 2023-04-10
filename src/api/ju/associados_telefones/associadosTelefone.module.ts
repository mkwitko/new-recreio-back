import { AssociadosTelefoneService } from './associadoTelefone.service';
import { AssociadosTelefoneModelService } from './model/model.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [AssociadosTelefoneModelService, AssociadosTelefoneService],
  exports: [AssociadosTelefoneModelService, AssociadosTelefoneService],
})
export class AssociadosTelefoneModule {}

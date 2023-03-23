import { AssociadosService } from './associado.service';
import { AssociadosModelService } from './model/model.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [AssociadosModelService, AssociadosService],
  exports: [AssociadosModelService, AssociadosService],
})
export class AssociadosModule {}

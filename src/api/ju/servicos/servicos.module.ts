import { ServicosService } from './servicos.service';
import { ServicosModelService } from './model/model.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [ServicosModelService, ServicosService],
  exports: [ServicosModelService, ServicosService],
})
export class ServicosModule {}

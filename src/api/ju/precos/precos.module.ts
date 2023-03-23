import { PrecosModelService } from './model/model.service';
import { PrecosService } from './precos.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [PrecosService, PrecosModelService],
  exports: [PrecosService, PrecosModelService],
})
export class PrecosModule {}

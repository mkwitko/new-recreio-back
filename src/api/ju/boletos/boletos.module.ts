import { BoletosService } from './boletos.service';
import { BoletosModelService } from './model/model.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [BoletosModelService, BoletosService],
  exports: [BoletosModelService, BoletosService],
})
export class BoletosModule {}

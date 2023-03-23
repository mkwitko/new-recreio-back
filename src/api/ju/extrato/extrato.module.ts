import { ExtratoService } from './extrato.service';
import { ExtratoModelService } from './model/model.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [ExtratoModelService, ExtratoService],
  exports: [ExtratoModelService, ExtratoService],
})
export class ExtratoModule {}

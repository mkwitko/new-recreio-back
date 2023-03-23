import { RetiradasModelService } from './model/model.service';
import { RetiradasService } from './retiradas.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [RetiradasService, RetiradasModelService],
  exports: [RetiradasService, RetiradasModelService],
})
export class RetiradasModule {}

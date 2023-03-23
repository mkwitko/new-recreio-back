import { LocaisService } from './locais.service';
import { LocaisModelService } from './model/model.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [LocaisModelService, LocaisService],
  exports: [LocaisModelService, LocaisService],
})
export class LocaisModule {}

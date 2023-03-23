import { AlsModule } from './../../../services/local-context/als.module';
import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServicesModel } from './model/model.service';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AlsModule],
  controllers: [ServicesController],
  providers: [ServicesService, ServicesModel],
  exports: [ServicesModel, ServicesService],
})
export class ServicesModule {}

import { PricesModel } from './model/model.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';

@Module({
  imports: [PrismaModule],
  controllers: [PricesController],
  providers: [PricesService, PricesModel],
  exports: [PricesModel, PricesService],
})
export class PricesModule {}

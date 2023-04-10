import { Module } from '@nestjs/common';
import { PricesCronController } from './cron.controller';
import { PricesCronService } from './cron.service';
import { PricesCronModelService } from './model/model.service';
import { PricesModule } from 'src/api/routes/prices/prices.module';
import { PrecosModule } from 'src/api/ju/precos/precos.module';

@Module({
  imports: [PrecosModule, PricesModule],
  controllers: [PricesCronController],
  providers: [PricesCronService, PricesCronModelService],
  exports: [PricesCronService, PricesCronModelService],
})
export class PricesCronModule {}

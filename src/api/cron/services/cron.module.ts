import { Module } from '@nestjs/common';
import { ServiceCronController } from './cron.controller';
import { ServicesCronService } from './cron.service';
import { ServicesServiceCronModelService } from './model/model.service';
import { ServicosModule } from 'src/api/ju/servicos/servicos.module';
import { ServicesModule } from 'src/api/routes/services/services.module';

@Module({
  imports: [ServicosModule, ServicesModule],
  controllers: [ServiceCronController],
  providers: [ServicesCronService, ServicesServiceCronModelService],
  exports: [ServicesCronService, ServicesServiceCronModelService],
})
export class ServicesCronModule {}

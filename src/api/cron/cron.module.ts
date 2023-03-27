import { ServicesCronModule } from './services/cron.module';
import { LocationsCronModule } from './locations/cron.module';
import { Module } from '@nestjs/common';
import { UsersCronModule } from './users/cron.module';
import { ClassificacoesCronModule } from './classificacoes/cron.module';

@Module({
  imports: [
    UsersCronModule,
    LocationsCronModule,
    ServicesCronModule,
    ClassificacoesCronModule,
  ],
})
export class CronModule {}

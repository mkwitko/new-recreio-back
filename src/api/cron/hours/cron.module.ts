import { Module } from '@nestjs/common';
import { HoursCronController } from './cron.controller';
import { HoursCronService } from './cron.service';
import { HoursCronModelService } from './model/model.service';
import { HorariosModule } from 'src/api/ju/horarios/horarios.module';
import { HoursModule } from 'src/api/routes/hours/hours.module';

@Module({
  imports: [HorariosModule, HoursModule],
  controllers: [HoursCronController],
  providers: [HoursCronService, HoursCronModelService],
  exports: [HoursCronService, HoursCronModelService],
})
export class HoursCronModule {}

import { ClsModule } from 'nestjs-cls';
import { PrismaModule } from './../../../shared_module/prisma/prisma.module';
import { WaitlistService } from './waitlist.service';
import { Module } from '@nestjs/common';
import { WaitlistController } from './waitlist.controller';
import { WaitlistModel } from './model/model.service';
import { ServicesModule } from '../services/services.module';
import { AlsModule } from 'src/services/local-context/als.module';

@Module({
  imports: [ServicesModule, PrismaModule, AlsModule],
  controllers: [WaitlistController],
  providers: [WaitlistService, WaitlistModel],
  exports: [WaitlistService, WaitlistModel],
})
export class WaitlistModule {}

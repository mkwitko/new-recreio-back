import { ForgotModel } from './model/model.service';
import { ForgotService } from './forgot.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ForgotService, ForgotModel],
  exports: [ForgotService, ForgotModel],
})
export class ForgotModule {}

import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { SessionModel } from './model/model.service';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SessionController],
  providers: [SessionService, SessionModel],
  exports: [SessionService, SessionModel],
})
export class SessionModule {}

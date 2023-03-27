import { AgeModule } from './../../../services/age/age.module';
import { SessionModule } from './../session/session.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersModel } from './model/model.service';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { AlsModule } from 'src/services/local-context/als.module';

@Module({
  imports: [PrismaModule, SessionModule, AlsModule, AgeModule],
  controllers: [UsersController],
  providers: [UsersService, UsersModel],
  exports: [UsersService, UsersModel],
})
export class UsersModule {}

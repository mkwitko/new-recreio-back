import { UsersModule } from './../users/users.module';
import { SessionModule } from './../session/session.module';
import { SessionSerializer } from './Passport/Session/session.serializer';
import { PrismaModule } from './../../../shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './Passport/Strategy/local-strategy';
import { ValidationService } from './helper/validation/validation.service';

@Module({
  imports: [
    PrismaModule,
    SessionModule,
    UsersModule,
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, ValidationService],
  exports: [AuthService, ValidationService],
})
export class AuthModule {}

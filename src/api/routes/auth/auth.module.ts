import { GuestsModule } from './../guests/guests.module';
import { EmailModule } from '../../../services/email/email.module';
import { TypeValidationModule } from './../../../services/type-validation/type-validation.module';
import { AssociadosModule } from './../../ju/associados_ativos/associados.module';
import { UsersModule } from './../users/users.module';
import { SessionSerializer } from './Passport/Session/session.serializer';
import { PrismaModule } from './../../../shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './Passport/Strategy/local-strategy';
import { ValidationService } from './helper/validation/validation.service';
import { AssociadosTelefoneModule } from 'src/api/ju/associados_telefones/associadosTelefone.module';
import { AlsModule } from 'src/services/local-context/als.module';
import { ForgotModule } from '../forgot/forgot.module';
import { SmsModule } from 'src/services/sms/sms.module';
import { EncryptModule } from 'src/services/encrypt/encrypt.module';
import { CellphoneService } from './helper/validation/cellphone/cellphone.service';
import { ForgotController } from './forgot.controller';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    GuestsModule,
    AlsModule,
    ForgotModule,
    SmsModule,
    AssociadosModule,
    AssociadosTelefoneModule,
    PassportModule.register({
      session: true,
    }),
    TypeValidationModule,
    EmailModule,
    EncryptModule,
  ],
  controllers: [AuthController, ForgotController],
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer,
    ValidationService,
    CellphoneService,
  ],
  exports: [AuthService, ValidationService],
})
export class AuthModule {}

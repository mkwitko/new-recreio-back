import { EmailModule } from '../../services/email/email.module';
import { PaymentModule } from './payments/payment.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { Module } from '@nestjs/common';
import { ClassificationModule } from './classifications/classifications.module';
import { LocationsModule } from './locations/locations.module';
import { ServicesModule } from './services/services.module';
import { SessionModule } from './session/session.module';
import { SocialImageModule } from './social_image/socialImage.module';
import { UsersModule } from './users/users.module';
import { WaitlistModule } from './waitlist/waitlist.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { AgeModule } from 'src/services/age/age.module';
import { AlsModule } from 'src/services/local-context/als.module';
import { SmsModule } from '../../services/sms/sms.module';
import { ClassificationFilterModule } from './classifications_filter/classifications_filter.module';
import { HeadquartersModule } from './headquarters/headquarters.module';
import { PricesModule } from './prices/prices.module';
import { ConfigModule } from '@nestjs/config';
import { HoursModule } from './hours/hours.module';

@Module({
  imports: [
    ClassificationModule,
    LocationsModule,
    ServicesModule,
    SessionModule,
    SocialImageModule,
    UsersModule,
    WaitlistModule,
    PrismaModule,
    AlsModule,
    AgeModule,
    AuthModule,
    PaymentModule,
    SmsModule,
    EmailModule,
    ClassificationFilterModule,
    HeadquartersModule,
    PricesModule,
    HoursModule,
    ConfigModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class RoutesModule {}

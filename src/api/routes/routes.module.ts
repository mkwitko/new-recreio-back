import { UsersService } from './users/users.service';
import { Module } from '@nestjs/common';
import { ClassificationModule } from './classifications/services.module';
import { LocationsModule } from './locations/locations.module';
import { ServicesModule } from './services/services.module';
import { SessionModule } from './session/session.module';
import { SocialImageModule } from './social_image/socialImage.module';
import { UsersModule } from './users/users.module';
import { WaitlistModule } from './waitlist/waitlist.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { AgeModule } from 'src/services/age/age.module';
import { AlsModule } from 'src/services/local-context/als.module';

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
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class RoutesModule {}

import { AlsModule } from '../../../services/local-context/als.module';
import { Module } from '@nestjs/common';
import { HeadquartersService } from './headquarters.service';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { HeadquartersModel } from './model/model.service';
import { HeadquartersController } from './headquarters.controller';

@Module({
  imports: [PrismaModule, AlsModule],
  controllers: [HeadquartersController],
  providers: [HeadquartersService, HeadquartersModel],
  exports: [HeadquartersModel, HeadquartersService],
})
export class HeadquartersModule {}

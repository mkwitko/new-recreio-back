import { ConfigModel } from './model/model.service';
import { ConfigService } from './config.service';
import { Module } from '@nestjs/common';
import { ConfigController } from './config.controller';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ConfigController],
  providers: [ConfigService, ConfigModel],
  exports: [ConfigService, ConfigModel],
})
export class ConfigModule {}

import { SocialImageModel } from './model/model.service';
import { SocialImageService } from './socialImage.service';
import { SocialImageController } from './socialImage.controller';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SocialImageController],
  providers: [SocialImageService, SocialImageModel],
  exports: [SocialImageModel, SocialImageService],
})
export class SocialImageModule {}

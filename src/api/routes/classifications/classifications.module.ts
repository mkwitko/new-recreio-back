import { AlsModule } from '../../../services/local-context/als.module';
import { Module } from '@nestjs/common';
import { ClassificationService } from './classifications.service';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { ClassificationModel } from './model/model.service';
import { ClassificationController } from './classifications.controller';

@Module({
  imports: [PrismaModule, AlsModule],
  controllers: [ClassificationController],
  providers: [ClassificationService, ClassificationModel],
  exports: [ClassificationModel, ClassificationService],
})
export class ClassificationModule {}

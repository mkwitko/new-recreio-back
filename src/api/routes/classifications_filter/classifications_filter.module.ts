import { AlsModule } from '../../../services/local-context/als.module';
import { Module } from '@nestjs/common';
import { ClassificationFilterService } from './classifications_filter.service';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { ClassificationFilterModel } from './model/model.service';
import { ClassificationFilterController } from './classifications_filter.controller';

@Module({
  imports: [PrismaModule, AlsModule],
  controllers: [ClassificationFilterController],
  providers: [ClassificationFilterService, ClassificationFilterModel],
  exports: [ClassificationFilterModel, ClassificationFilterService],
})
export class ClassificationFilterModule {}

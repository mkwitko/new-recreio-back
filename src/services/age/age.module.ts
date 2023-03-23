import { Module } from '@nestjs/common';
import { AgeService } from './age.service';

@Module({
  providers: [AgeService],
  exports: [AgeService],
})
export class AgeModule {}

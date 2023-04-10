import { Module } from '@nestjs/common';
import { TypeValidationService } from './type-validation.service';

@Module({
  providers: [TypeValidationService],
  exports: [TypeValidationService],
})
export class TypeValidationModule {}

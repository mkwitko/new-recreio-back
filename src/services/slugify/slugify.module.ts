import { SlugifyService } from './slugify.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [SlugifyService],
  exports: [SlugifyService],
})
export class SlugifyModule {}

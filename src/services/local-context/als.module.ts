import { LocalContextService } from './local-context.service';
import { Module } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Module({
  providers: [
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage(),
    },
    LocalContextService,
  ],
  exports: [AsyncLocalStorage, LocalContextService],
})
export class AlsModule {}

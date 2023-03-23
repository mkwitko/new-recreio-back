import { AsyncLocalStorage } from 'node:async_hooks';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalContextService {
  constructor(private als: AsyncLocalStorage<any>) {}

  get(key: string) {
    return this.als.getStore()[key];
  }
}

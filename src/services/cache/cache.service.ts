import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string) {
    return await this.cacheManager.get(key);
  }

  // 86400000 = 1 dia
  async set(key: string, value: any, ttl = 86400000) {
    return await this.cacheManager.set(key, value, ttl);
  }

  async delete(key: string) {
    return await this.cacheManager.del(key);
  }

  async reset() {
    return await this.cacheManager.reset();
  }
}

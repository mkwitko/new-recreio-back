import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AlsModule } from './services/local-context/als.module';
import { PrismaModule } from './shared_module/prisma/prisma.module';

// Ju
import { JuModule } from './api/ju/ju.module';

// Ezoom
import { RoutesModule } from './api/routes/routes.module';

// Helpers
import { AgeModule } from './services/age/age.module';
import { SlugifyModule } from './services/slugify/slugify.module';

// Cron
import { CronModule } from './api/cron/cron.module';

// Cache
import { CacheService } from './services/cache/cache.service';

// Slugify
import { SlugifyService } from './services/slugify/slugify.service';

// User
import { UsersService } from './api/routes/users/users.service';

// ALS
import { AsyncLocalStorage } from 'async_hooks';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Generics
    ConfigModule.forRoot(), // Importante o config module estar como primeiro
    ScheduleModule.forRoot(),
    AlsModule,
    CacheModule.register(),
    PrismaModule,

    // Ju
    JuModule,

    // Ezoom
    RoutesModule,

    // Helpers
    AgeModule,
    SlugifyModule,

    // Cron
    CronModule,
  ],
  providers: [CacheService, SlugifyService],
})
export class AppModule implements NestModule {
  constructor(
    private readonly als: AsyncLocalStorage<any>,
    private user: UsersService,
  ) {}

  count = 0;
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(async (req, res, next) => {
        const user = await this.user.get_by_session(req.headers['session-id']);
        let dependents = [];
        if (user && user.sequency == '00') {
          dependents = await this.user.get({
            where: {
              id: user.id,
              NOT: {
                sequency: '00',
              },
            },
          });
          dependents.map((e) => {
            if (e && e.dtnascimento) {
              const age = this.user.age.getAge(e.dtnascimento);
              e.age = age ? age : null;
            }
          });
        }

        const store = {
          user,
          dependents,
        };

        this.als.run(store, () => next());
      })
      .exclude({ path: 'auth/login', method: RequestMethod.POST })
      .forRoutes('*');
  }
}

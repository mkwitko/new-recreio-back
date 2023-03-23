import { ReservaServicosModule } from './api/routes/reserva_servicos/reserva_servicos.module';
import { ReservaQuadrasModule } from './api/ju/reserva_quadras/reserva_quadras.module';
import { UtilizacoesModule } from './api/ju/utilizacoes/utilizacoes.module';
import { AsyncLocalStorage } from 'async_hooks';
import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { WaitlistModule } from './api/routes/waitlist/waitlist.module';
import { ServicesModule } from './api/routes/services/services.module';
import { PrismaModule } from './shared_module/prisma/prisma.module';
import { AuthModule } from './api/routes/auth/auth.module';
import { UsersModule } from './api/routes/users/users.module';
import { SessionModule } from './api/routes/session/session.module';
import { CacheService } from './services/cache/cache.service';
import { AlsModule } from './services/local-context/als.module';
import { UsersService } from './api/routes/users/users.service';
import { AgeModule } from './services/age/age.module';
import { LocationsModule } from './api/routes/locations/locations.module';
import { ScheduleModule } from '@nestjs/schedule';
import { VacinacaoModule } from './api/routes/vacinacao/vacinacao.module';
import { RetiradasModule } from './api/ju/retiradas/retiradas.module';
import { PrecosModule } from './api/ju/precos/precos.module';

@Module({
  imports: [
    //
    ScheduleModule.forRoot(),
    AlsModule,
    CacheModule.register(),
    PrismaModule,

    //
    AuthModule,
    LocationsModule,
    PrecosModule,
    ReservaQuadrasModule,
    ReservaServicosModule,
    RetiradasModule,
    ServicesModule,
    SessionModule,
    UsersModule,
    UtilizacoesModule,
    VacinacaoModule,
    WaitlistModule,

    //
    AgeModule,
  ],
  controllers: [],
  providers: [CacheService],
})
export class AppModule implements NestModule {
  constructor(
    // inject the AsyncLocalStorage in the module constructor,
    private readonly als: AsyncLocalStorage<any>,
    private user: UsersService,
  ) {}

  count = 0;
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(async (req, res, next) => {
        const user = await this.user.get_by_session(req.headers['session-id']);
        let dependents = [];
        if (user.sequency == '00') {
          dependents = await this.user.get(
            {
              where: {
                associado: +user.id,
                NOT: {
                  sequencia: 0,
                },
              },
            },
            true,
          );
          dependents.map((e) => {
            e.age = this.user.age.getAge(e.dtnascimento);
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

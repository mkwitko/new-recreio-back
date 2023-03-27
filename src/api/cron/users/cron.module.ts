import { UsersCronModelService } from './model/model.service';
import { Module } from '@nestjs/common';
import { AssociadosModule } from 'src/api/ju/associados_ativos/associados.module';
import { UsersModule } from 'src/api/routes/users/users.module';
import { UsersCronController } from './cron.controller';
import { UsersCronService } from './cron.service';

@Module({
  imports: [UsersModule, AssociadosModule],
  controllers: [UsersCronController],
  providers: [UsersCronService, UsersCronModelService],
  exports: [UsersCronService, UsersCronModelService],
})
export class UsersCronModule {}

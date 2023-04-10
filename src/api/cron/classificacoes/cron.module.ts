import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { ClassificacoesServiceCronModelService } from './model/model.service';
import { ClassificacoesCronService } from './cron.service';
import { ClassificacoesCronController } from './cron.controller';
import { Module } from '@nestjs/common';
import { ClassificationModule } from 'src/api/routes/classifications/classifications.module';
import { ClassificacoesModule } from 'src/api/ju/classificacoes/classificacoes.module';

@Module({
  imports: [ClassificationModule, ClassificacoesModule, PrismaModule],
  controllers: [ClassificacoesCronController],
  providers: [ClassificacoesCronService, ClassificacoesServiceCronModelService],
  exports: [ClassificacoesCronService, ClassificacoesServiceCronModelService],
})
export class ClassificacoesCronModule {}

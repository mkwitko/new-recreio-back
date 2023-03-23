import { CategoriasService } from './categorias.service';
import { CategoriasModelService } from './model/model.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [CategoriasModelService, CategoriasService],
  exports: [CategoriasModelService, CategoriasService],
})
export class CategoriasModule {}

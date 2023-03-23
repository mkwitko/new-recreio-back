import { PrismaServiceJu } from './../../../database_core/prisma.service_ju';
import { PrismaService } from './../../../database_core/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [PrismaService, PrismaServiceJu],
  exports: [PrismaService, PrismaServiceJu],
})
export class PrismaModule {}

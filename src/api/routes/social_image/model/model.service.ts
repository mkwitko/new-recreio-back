import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database_core/prisma.service';
import { QueryClass } from 'src/parents/query/query';

@Injectable()
export class SocialImageModel extends QueryClass {
  override table = 'site_social_image';
  constructor(protected db: PrismaService) {
    super(db);
  }
}

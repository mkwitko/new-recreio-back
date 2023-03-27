import { LocalContextService } from './../../../services/local-context/local-context.service';
import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private local: LocalContextService,
  ) {}

  @Get('dependents')
  async dependents() {
    const user = await this.local.get('user');
    return this.usersService.get({
      where: {
        associado: +user.id,
        NOT: {
          sequencia: 0,
        },
      },
    });
  }
}

import { ControlController } from 'src/parents/routes/control/control.controller';
import { LocalContextService } from './../../../services/local-context/local-context.service';
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController extends ControlController {
  constructor(
    private readonly usersService: UsersService,
    private local: LocalContextService,
  ) {
    super(usersService);
  }

  @Get('dependents')
  async dependents() {
    const dependents = await this.local.get('dependents');
    if (dependents)
      return {
        status: true,
        data: dependents,
      };
    const user = await this.local.get('user');
    const result = await this.usersService.get({
      where: {
        id: user.id,
        NOT: {
          sequency: '00',
        },
      },
    });
    return {
      status: result.length > 0,
      data: result,
    };
  }
}

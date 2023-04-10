import { ControlController } from 'src/parents/routes/control/control.controller';
import { Controller, Post, UseGuards, Request, Ip } from '@nestjs/common';
import { LocalAuthGuard } from './Passport/Guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController extends ControlController {
  constructor(private auth: AuthService, private users: UsersService) {
    super(auth);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Ip() ip: string) {
    const session = await this.users.getSession(req.user, req.session.id, ip);
    const {
      created,
      deleted,
      password,
      retrieve_hash,
      udid,
      updated,
      ...user
    } = req.user;

    user.session = session[0].session_id;

    user.age = this.users.age.getAge(user.dtnascimento);
    if (user) {
      return {
        status: true,
        data: user,
      };
    }
    return {
      status: false,
      data: 'E-mail ou senha inválidos. Tente realizar login utilizando como senha os últimos cinco dígitos de seu CPF ou entre em contato pelos telefones (54) 3028-3555 (secretaria principal) e (54) 3022-3525.',
    };
  }

  @Post('loginAnon')
  async loginAnon(@Request() req) {
    const params = this.reqBody(req);
    const result = await this.auth.validateAnon(params);
    return result;
  }

  @Post('loginSms')
  async loginSms(@Request() req) {
    const params = this.reqBody(req);
    const result = await this.auth.sms(params.number, params.code);
    return result;
  }
}

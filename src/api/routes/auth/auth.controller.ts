import { AuthenticatedGuard } from './Passport/Guards/authenticated.guard';
import { Controller, Post, UseGuards, Request, Ip, Get } from '@nestjs/common';
import { LocalAuthGuard } from './Passport/Guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Ip() ip: string) {
    const session = await this.auth.getSession(req.user, req.session.id, ip);
    const user = req.user;
    user.session = session[0].session_id;
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

  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  async logout(@Request() req) {
    return req.logout();
  }
}

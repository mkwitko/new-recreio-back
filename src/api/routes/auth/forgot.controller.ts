import { ControlController } from 'src/parents/routes/control/control.controller';
import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class ForgotController extends ControlController {
  constructor(private auth: AuthService) {
    super(auth);
  }

  @Post('forgot')
  async forgot(@Request() req) {
    const params = this.reqBody(req);
    const result = await this.auth.forgot(params.to);
    return result;
  }

  @Post('verify')
  async verify(@Request() req) {
    const params = this.reqBody(req);
    const result = await this.auth.verify(params.to, params.code);
    return result;
  }

  @Post('change')
  async change(@Request() req) {
    const params = this.reqBody(req);
    const result = await this.auth.change(params.email, params.password);
    return {
      status: result ? true : false,
      data: result,
    };
  }
}

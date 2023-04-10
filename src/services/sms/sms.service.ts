import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ForgotModel } from '../../api/routes/forgot/model/model.service';
import { EncryptService } from '../encrypt/encrypt.service';

@Injectable()
export class SmsService {
  url = this.configService.get('smsToken').base_path;
  key = this.configService.get('smsToken').key;
  constructor(
    private configService: ConfigService,
    private http: HttpService,
    private forgotModel: ForgotModel,
    private encrypt: EncryptService,
  ) {}

  async send(number: string) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + 'verify', {
          key: this.configService.get('smsToken').key,
          number,
          template: '<#> Seu código de verificação é: {999-999}',
          expire: 120,
        })
        .subscribe(async (res) => {
          this.forgotModel.insert({
            cellphone: number,
            code: await this.encrypt.hash(res.data.code, 10),
          });
          resolve(res.data ? true : false);
        });
    });
  }

  async verify(number: string, codeSended: string) {
    const register = await this.forgotModel.get({
      where: {
        cellphone: number,
      },
    });
    const code = await register[0].code;
    const status = await this.encrypt.checkPassword(codeSended, code);
    if (status) {
      await this.forgotModel.delete({
        where: {
          id: register[0].id,
        },
      });
    }
    return status;
  }
}

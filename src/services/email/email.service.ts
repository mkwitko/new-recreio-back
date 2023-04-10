/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const sgMail = require('@sendgrid/mail');

@Injectable()
export class EmailService {
  private key = this.configService.get('sendGrid').key;
  private from = this.configService.get('sendGrid').from;
  constructor(private configService: ConfigService) {}

  async send(
    data = {
      to: 'mauricio.kwitko@ezoom.com.br',
      subject: 'Teste',
      text: 'Teste',
      html: 'Teste',
    },
  ) {
    const message = {
      to: data.to,
      from: this.from,
      subject: data.subject,
      text: data.text,
      html: data.html,
    };
    sgMail.setApiKey(this.key);
    return new Promise((resolve, reject) => {
      sgMail
        .send(message)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

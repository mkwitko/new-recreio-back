import { CreditCardInterface } from './Interface/pagarme.interface';
/* eslint-disable @typescript-eslint/no-var-requires */
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PagarmeService {
  constructor(
    private configService: ConfigService,
    private http: HttpService,
  ) {}

  async credit_card({
    name = 'Tony Stark',
    amount = 3000,
    description = 'Mensalidade',
    quantity = 1,
    card = {
      number: 4000000000000028,
      holder_name: 'Tony Stark',
      exp_month: 1,
      exp_year: 24,
      cvv: '3531',
    },
  }: CreditCardInterface): Promise<any> {
    const options = {
      method: 'POST',
      url: 'https://api.pagar.me/core/v5/orders',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: this.configService.get('pagarme').key,
      },
      data: {
        customer: { name },
        items: [{ amount, description, quantity }],
        payments: [
          {
            credit_card: {
              card,
              operation_type: 'auth_and_capture',
              installments: 1,
            },
            payment_method: 'credit_card',
          },
        ],
      },
    };
    return new Promise((resolve, reject) => {
      this.http.request(options).subscribe((response) => {
        if (response) {
          resolve(response.data);
        }
        reject(response);
      });
    });
  }
}

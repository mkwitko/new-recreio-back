import { PagarmeService } from './../../../services/pagarme/pagarme.service';
import { PaymentModel } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ServService } from 'src/parents/routes/serv/serv.service';
import { CreditCardInterface } from 'src/services/pagarme/Interface/pagarme.interface';

@Injectable()
export class PaymentService extends ServService {
  constructor(public model: PaymentModel, private pagarme: PagarmeService) {
    super(model);
  }

  async credit_card(options: CreditCardInterface) {
    return await this.pagarme.credit_card(options);
  }
}

import { ControlController } from 'src/parents/routes/control/control.controller';
import { Controller } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController extends ControlController {
  constructor(public paymentService: PaymentService) {
    super(paymentService);
  }
}

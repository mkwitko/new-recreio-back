import { PagarmeModule } from './../../../services/pagarme/pagarme.module';
import { AlsModule } from '../../../services/local-context/als.module';
import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentModel } from './model/model.service';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AlsModule, PagarmeModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentModel],
  exports: [PaymentModel, PaymentService],
})
export class PaymentModule {}

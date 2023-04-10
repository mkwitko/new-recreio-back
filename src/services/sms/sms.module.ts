import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { ForgotModule } from '../../api/routes/forgot/forgot.module';
import { EncryptModule } from '../encrypt/encrypt.module';

@Module({
  imports: [HttpModule, ForgotModule, EncryptModule],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}

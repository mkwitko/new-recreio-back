import { ServService } from '../../../parents/routes/serv/serv.service';
import { ForgotModel } from './model/model.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ForgotService extends ServService {
  constructor(public model: ForgotModel) {
    super(model);
  }
}

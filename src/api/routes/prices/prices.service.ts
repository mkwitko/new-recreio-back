import { PricesModel } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ServService } from 'src/parents/routes/serv/serv.service';

@Injectable()
export class PricesService extends ServService {
  constructor(public model: PricesModel) {
    super(model);
  }
}

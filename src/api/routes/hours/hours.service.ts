import { HoursModel } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ServService } from 'src/parents/routes/serv/serv.service';

@Injectable()
export class HoursService extends ServService {
  constructor(public model: HoursModel) {
    super(model);
  }
}

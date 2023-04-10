import { ServService } from '../../../parents/routes/serv/serv.service';
import { GuestsModel } from './model/model.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GuestsService extends ServService {
  constructor(public model: GuestsModel) {
    super(model);
  }
}

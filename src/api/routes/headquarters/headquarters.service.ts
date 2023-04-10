import { ServService } from '../../../parents/routes/serv/serv.service';
import { HeadquartersModel } from './model/model.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HeadquartersService extends ServService {
  constructor(public model: HeadquartersModel) {
    super(model);
  }
}

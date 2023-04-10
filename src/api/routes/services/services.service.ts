import { ServicesModel } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';
import { ServService } from 'src/parents/routes/serv/serv.service';

@Injectable()
export class ServicesService extends ServService {
  constructor(public model: ServicesModel) {
    super(model);
  }
}

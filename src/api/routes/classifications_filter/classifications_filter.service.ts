import { ServService } from '../../../parents/routes/serv/serv.service';
import { ClassificationFilterModel } from './model/model.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassificationFilterService extends ServService {
  constructor(public model: ClassificationFilterModel) {
    super(model);
  }
}

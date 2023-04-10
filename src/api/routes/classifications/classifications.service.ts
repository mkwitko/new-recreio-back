import { ServService } from '../../../parents/routes/serv/serv.service';
import { ClassificationModel } from './model/model.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassificationService extends ServService {
  constructor(public model: ClassificationModel) {
    super(model);
  }
}

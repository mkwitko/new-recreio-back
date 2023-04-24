import { ServService } from '../../../parents/routes/serv/serv.service';
import { ConfigModel } from './model/model.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService extends ServService {
  constructor(public model: ConfigModel) {
    super(model);
  }
}

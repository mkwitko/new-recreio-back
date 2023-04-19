import { UtilizacoesModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ServService } from 'src/parents/routes/serv/serv.service';

@Injectable()
export class UtilizacoesService extends ServService {
  constructor(public model: UtilizacoesModelService) {
    super(model);
  }
}

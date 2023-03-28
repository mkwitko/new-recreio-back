import { SocialImageModel } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ServService } from 'src/parents/routes/serv/serv.service';

@Injectable()
export class SocialImageService extends ServService {
  constructor(public model: SocialImageModel) {
    super(model);
  }
}

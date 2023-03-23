import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class AgeService {
  getAge(date) {
    return moment().diff(date, 'years');
  }
}

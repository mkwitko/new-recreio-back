import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class SlugifyService {
  slugify(value: string) {
    return slugify(value, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      strict: true,
    });
  }
}

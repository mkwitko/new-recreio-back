import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    next();
  }
}

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: any, res: any, next: () => void) {
    this.logger.log('[Req  ] ' + req.method + ' ' + req.originalUrl);
    this.logger.log('[Agent] ' + (req.headers['user-agent'] ?? ''));
    this.logger.log('[Query] ' + JSON.stringify(req.query));
    this.logger.log('[Body ] ' + JSON.stringify(req.body));
    next();
  }
}
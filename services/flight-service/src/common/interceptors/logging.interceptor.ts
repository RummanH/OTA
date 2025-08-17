import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('gRPC');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const method = context.getHandler().name;
    const className = context.getClass().name;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => this.logger.log(`${className}#${method} executed in ${Date.now() - now}ms`)),
    );
  }
}

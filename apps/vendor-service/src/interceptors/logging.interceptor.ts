import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import path from 'node:path';
import fsp from 'node:fs/promises';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const reqStart = process.hrtime.bigint();
    const requestTime = new Date().toISOString();

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const { method, url, headers } = request;
    const hostname = headers.host || 'unknown';

    const requestLogPath = path.join(__dirname, '..', '..', 'logs', 'request.log');
    const errorLogPath = path.join(__dirname, '..', '..', 'logs', 'error.log');

    return next.handle().pipe(
      tap(() => {
        void this.logRequest({
          reqStart,
          requestTime,
          hostname,
          method,
          url,
          requestLogPath,
        });
      }),

      catchError((error) => {
        void this.logError({
          reqStart,
          error,
          errorLogPath,
        });
        throw error;
      }),
    );
  }

  private async logRequest({ reqStart, requestTime, hostname, method, url, requestLogPath }: { reqStart: bigint; requestTime: string; hostname: string; method: string; url: string; requestLogPath: string }) {
    const reqEnd = process.hrtime.bigint();
    const timeTakenMs = Number(reqEnd - reqStart) / 1e6;

    const logMessage = `Time: ${requestTime} | Host: ${hostname} | Method: ${method} | URL: ${url} | Took: ${timeTakenMs.toFixed(3)}ms\n`;

    await fsp.appendFile(requestLogPath, logMessage).catch(console.error);
  }

  private async logError({ reqStart, error, errorLogPath }: { reqStart: bigint; error: any; errorLogPath: string }) {
    const reqEnd = process.hrtime.bigint();
    const timeTakenMs = Number(reqEnd - reqStart) / 1e6;

    const errorMessage = `Error: ${error.message} | Failed after ${timeTakenMs.toFixed(3)} ms\n`;

    await fsp.appendFile(errorLogPath, errorMessage).catch(console.error);
  }
}

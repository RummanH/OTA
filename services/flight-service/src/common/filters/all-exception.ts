import { Catch, RpcExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { status } from '@grpc/grpc-js';

@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter<any> {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    const error = {
      message: exception.message || 'Internal server error',
      code: exception.code || status.UNKNOWN,
    };
    return throwError(() => error);
  }
}

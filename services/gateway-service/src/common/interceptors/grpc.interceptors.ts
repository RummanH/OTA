import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { status } from '@grpc/grpc-js';

@Injectable()
export class GrpcToHttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const httpStatus = this.mapGrpcCodeToHttp(error.code);
        const message = error.details || this.defaultMessage(error.code);

        if (process.env.NODE_ENV !== 'production') {
          console.error(`[gRPC → HTTP Interceptor] Caught error:`, JSON.stringify(error, null, 2));
        }

        return throwError(() => ({
          statusCode: httpStatus,
          message,
        }));
      }),
    );
  }

  private mapGrpcCodeToHttp(code: number): number {
    switch (code) {
      case status.OK:
        return 200;
      case status.CANCELLED:
        return 499;
      case status.UNKNOWN:
        return 500;
      case status.INVALID_ARGUMENT:
        return 400;
      case status.DEADLINE_EXCEEDED:
        return 504;
      case status.NOT_FOUND:
        return 404;
      case status.ALREADY_EXISTS:
        return 409;
      case status.PERMISSION_DENIED:
        return 403;
      case status.RESOURCE_EXHAUSTED:
        return 429;
      case status.FAILED_PRECONDITION:
        return 412;
      case status.ABORTED:
        return 409;
      case status.OUT_OF_RANGE:
        return 400;
      case status.UNIMPLEMENTED:
        return 501;
      case status.INTERNAL:
        return 500;
      case status.UNAVAILABLE:
        return 503;
      case status.DATA_LOSS:
        return 500;
      case status.UNAUTHENTICATED:
        return 401;
      default:
        return 500;
    }
  }

  private defaultMessage(code: number): string {
    switch (code) {
      case status.ALREADY_EXISTS:
        return 'Resource already exists';
      case status.INVALID_ARGUMENT:
        return 'Invalid input';
      case status.NOT_FOUND:
        return 'Resource not found';
      case status.PERMISSION_DENIED:
        return 'Permission denied';
      case status.UNAUTHENTICATED:
        return 'Authentication required';
      case status.UNAVAILABLE:
        return 'Service temporarily unavailable';
      default:
        return 'An unexpected error occurred';
    }
  }
}

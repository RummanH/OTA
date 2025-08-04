import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  QueryFailedError,
  EntityNotFoundError,
} from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Handle built-in HTTP exceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse();
      message =
        typeof responseBody === 'string'
          ? responseBody
          : (responseBody as any).message || JSON.stringify(responseBody);
    }

    // Handle TypeORM: Query errors (e.g., duplicate key, null value)
    else if (exception instanceof QueryFailedError) {
      const code = (exception as any).driverError?.code;
      const column = (exception as any).driverError?.column;

      switch (code) {
        case '23505': // duplicate key
          status = HttpStatus.CONFLICT;
          message = 'Duplicate entry violates unique constraint';
          break;
        case '23502': // not-null violation
          status = HttpStatus.BAD_REQUEST;
          message = `Missing required field: ${column}`;
          break;
        case '22P02': // invalid input (e.g. UUID parse error)
          status = HttpStatus.BAD_REQUEST;
          message = 'Invalid input syntax';
          break;
        case '23503': // foreign key violation
          status = HttpStatus.BAD_REQUEST;
          message = 'Foreign key constraint violation';
          break;
        default:
          status = HttpStatus.BAD_REQUEST;
          message = (exception as any).driverError?.detail || 'Database error';
      }
    }

    // Handle TypeORM: Entity not found
    else if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = 'Entity not found';
    }

    // Log the error
    this.logger.error(
      `Error ${status} at ${request.method} ${request.url}`,
      exception.stack || exception.toString(),
    );

    // Final error response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      stack:
        process.env.NODE_ENV !== 'production' ? exception.stack : undefined,
    });
  }
}

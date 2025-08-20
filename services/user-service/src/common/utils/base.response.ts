export interface ErrorDetail {
  name?: string;
  message: string;
}

export interface BaseResponse<T = any> {
  statusCode: number;
  success: boolean;
  message: string;
  payload?: T;
  errors?: ErrorDetail[];
  meta?: Record<string, any>;
}

export class ResponseBuilder<T = any> {
  private response: BaseResponse<T>;

  constructor() {
    this.response = {
      statusCode: 200,
      success: true,
      message: 'OK',
    };
  }

  status(code: number): this {
    this.response.statusCode = code;
    this.response.success = code >= 200 && code < 300;
    return this;
  }

  message(msg: string): this {
    this.response.message = msg;
    return this;
  }

  data(data: T): this {
    this.response.payload = data;
    return this;
  }

  errors(errors: ErrorDetail[]): this {
    this.response.errors = errors;
    return this;
  }

  meta(meta: Record<string, any>): this {
    this.response.meta = meta;
    return this;
  }

  build(): BaseResponse<T> {
    return this.response;
  }
}

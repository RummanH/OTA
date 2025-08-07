// src/vendor/services/vendor-http.service.ts

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class VendorHttpService {
  constructor(private readonly http: HttpService) {}

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<any> {
    try {
      const response$ = this.http.get<any>(url, config);
      return await firstValueFrom(response$);
    } catch (error) {
      this.handleError(error, 'GET', url);
    }
  }

  async post<T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<any> {
    try {
      const response$ = this.http.post<any>(url, data, config);
      return await firstValueFrom(response$);
    } catch (error) {
      this.handleError(error, 'POST', url);
    }
  }

  private handleError(error: any, method: string, url: string): never {
    const message = `[${method}] ${url} failed: ${error?.message}`;
    throw new Error(message);
  }
}

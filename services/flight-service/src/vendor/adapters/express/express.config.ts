import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpressConfig {
  readonly apiBaseUrl: string = process.env.EXPRESS_API_URL || 'https://flight-data-source.onrender.com';
  readonly apiKey: string = process.env.EXPRESS_API_KEY || 'your-default-api-key';
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ExpressConfig } from './express.config';
import { searchRequestDto } from 'src/vendor/dtos/search-request.dto';
import { searchResponseDto } from 'src/vendor/dtos/search-response.dto';
import { ExpressMapper } from './express.mapper';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExpressClient {
  name = 'Express';

  constructor(
    private readonly http: HttpService,
    private readonly config: ExpressConfig,
    private readonly mapper: ExpressMapper,
  ) {}

  async searchFlights(request: searchRequestDto): Promise<searchResponseDto[]> {
    try {
      const expressRequestPayload = this.mapper.mapToExpressRequest(request);

      const response$ = this.http.post<any>(this.config.apiBaseUrl, expressRequestPayload, {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      });

      const { data } = await firstValueFrom(response$);

      return this.mapper.mapToClientResponse(data);
    } catch (error) {
      return [];
    }
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ExpressConfig } from './express.config';
import { ExpressMapper } from './express.mapper';
import { firstValueFrom } from 'rxjs';
import { searchRequestDto } from 'src/common/dtos/search-request.dto';
import { searchResponseDto } from 'src/common/dtos/search-response.dto';

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

      const response$ = this.http.post<any>(this.config.apiBaseUrl + '/getFlight', expressRequestPayload, {
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

import { Injectable } from '@nestjs/common';
import { FlightSearchResult } from '../common/interceptors/response.interface';
import { ExpressClient } from './adapters/express/express.client';
import { searchRequestDto } from './dtos/search-request.dto';
import { searchResponseDto } from './dtos/search-response.dto';

@Injectable()
export class VendorService {
  constructor(private readonly expressClient: ExpressClient) {}

  async searchFlights(searchDto: searchRequestDto): Promise<searchResponseDto[]> {
    const expressData = await this.expressClient.searchFlights(searchDto);
    return [...expressData];
  }
}

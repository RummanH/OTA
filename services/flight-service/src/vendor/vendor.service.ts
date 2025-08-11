import { Injectable } from '@nestjs/common';
import { ExpressClient } from './adapters/express/express.client';
import { searchRequestDto } from 'src/common/dtos/search-request.dto';
import { searchResponseDto } from 'src/common/dtos/search-response.dto';

@Injectable()
export class VendorService {
  constructor(private readonly expressClient: ExpressClient) {}

  async searchFlights(searchDto: searchRequestDto): Promise<searchResponseDto[]> {
    const expressData = await this.expressClient.searchFlights(searchDto);
    return [...expressData];
  }
}

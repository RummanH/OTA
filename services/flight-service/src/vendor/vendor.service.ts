import { Injectable } from '@nestjs/common';
import { SabreService } from './sabre.service';
import { FlightSearchResult } from './interfaces/response.interface';
import { searchFlightsDto } from './dto/search.dto';

@Injectable()
export class VendorService {
  constructor(private readonly sabreService: SabreService) {}

  async searchFlights(dto: searchFlightsDto): Promise<FlightSearchResult[]> {
    const sabre = await this.sabreService.search(dto);
    return [...sabre];
  }
}

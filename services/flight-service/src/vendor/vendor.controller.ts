import { Controller } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { GrpcMethod } from '@nestjs/microservices';
import { searchRequestDto } from 'src/common/dtos/search-request.dto';

@Controller()
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @GrpcMethod('FlightService', 'SearchFlights')
  async getFlightsData(requestDto: searchRequestDto) {
    return { results: await this.vendorService.searchFlights(requestDto) };
  }
}

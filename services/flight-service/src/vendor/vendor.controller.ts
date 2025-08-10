import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { VendorService } from './vendor.service';
import { VENDOR_PATTERN_SEARCH_FLIGHTS } from '../shared/constants';
import type { FlightSearchRequest } from './interfaces/request.interface';
import { searchFlightsDto } from './dto/search.dto';

@Controller()
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  // @HttpCode(204)
  // @MessagePattern(VENDOR_PATTERN_SEARCH_FLIGHTS)
  // async handleFlightSearch(flightSearchRequest: FlightSearchRequest) {
  //   return this.vendorService.searchFlights(flightSearchRequest);
  // }

  @HttpCode(200)
  @Post('search')
  async handleFlightSearchHttp(@Body() flightSearchRequest: searchFlightsDto) {
    return this.vendorService.searchFlights(flightSearchRequest);
  }
}

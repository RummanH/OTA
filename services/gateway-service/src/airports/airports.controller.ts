import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AirportsService } from './airports.service';

@Controller('airports')
export class AirportsController {
  constructor(private readonly airportService: AirportsService) {}

  @Get('search')
  async search(@Query('q') q: string) {
    console.log(await this.airportService.searchAirports(q))
    return await this.airportService.searchAirports(q);
  }
}

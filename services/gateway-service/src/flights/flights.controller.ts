import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FlightsService } from './flights.service';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post('getFlightList')
  getFlightList(@Body() searchDto: any) {
    return this.flightsService.getFlightList(searchDto);
  }

  @Get('getAirports')
  getAirports(@Query('q') q: string) {
    return this.flightsService.getAirports(q);
  }
}

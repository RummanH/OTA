import { Body, Controller, Post } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { searchRequestDto } from 'src/common/dtos/search-request.dto';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post('getData')
  async getFlights(@Body() searchDto: any) {
    return this.flightsService.getFlights(searchDto);
  }
}

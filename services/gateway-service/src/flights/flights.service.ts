import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { FLIGHT_SERVICE_NAME } from 'src/common/constants';
import { searchRequestDto } from 'src/common/dtos/search-request.dto';

@Injectable()
export class FlightsService {
  private flightService: any;
  constructor(@Inject(FLIGHT_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.flightService = this.client.getService<any>(FLIGHT_SERVICE_NAME);
  }

  async getFlights(searchDto: searchRequestDto) {
    return this.flightService.SearchFlights(searchDto);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { AirportService } from 'src/common/interfaces/airports.proto';

@Injectable()
export class FlightsService {
  private flightService: any;
  private airportService: any;

  constructor(
    @Inject('FLIGHT_SERVICE') private flightClient: ClientGrpc,
    @Inject('AIRPORT_SERVICE') private airportClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.flightService = this.flightClient.getService<any>('FlightService');
    this.airportService = this.airportClient.getService<AirportService>('AirportService');
  }

  getFlightList(searchDto: any) {
    return this.flightService.SearchFlights(searchDto);
  }

  getAirports(searchString: string): any {
    return this.airportService.SearchAirports({ searchString, limit: 10 });
  }
}

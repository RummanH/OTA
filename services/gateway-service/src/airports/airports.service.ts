import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { AirportService, SearchAirportsResponse } from 'src/common/interfaces/airports.proto';

@Injectable()
export class AirportsService {
  private airportService: AirportService;
  constructor(@Inject('AirportService') private client: ClientGrpc) {}

  onModuleInit() {
    this.airportService = this.client.getService<AirportService>('AirportService');
  }

  async searchAirports(searchString: string): Promise<any> {
    return await this.airportService.SearchAirports({ searchString, limit: 10 });
  }
}

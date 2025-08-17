import { Controller } from '@nestjs/common';
import { AirportsService } from './airports.service';
import type { AirportResponse, CreateAirportRequest, DeleteAirportRequest, GetAirportRequest, ListAirportsRequest, ListAirportsResponse, SearchAirportsRequest, SearchAirportsResponse, UpdateAirportRequest } from 'src/common/interfaces/airports.proto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('')
export class AirportsController {
  constructor(private readonly airportsService: AirportsService) {}

  @GrpcMethod('AirportService', 'CreateAirport')
  createAirport(request: CreateAirportRequest): Promise<AirportResponse> {
    return this.airportsService.createAirport(request);
  }

  @GrpcMethod('AirportService', 'GetAirport')
  getAirport(request: GetAirportRequest): Promise<AirportResponse> {
    return this.airportsService.getAirport(request);
  }

  @GrpcMethod('AirportService', 'ListAirports')
  listAirports(request: ListAirportsRequest): Promise<ListAirportsResponse> {
    return this.airportsService.listAirports(request);
  }

  @GrpcMethod('AirportService', 'UpdateAirport')
  updateAirport(request: UpdateAirportRequest): Promise<AirportResponse> {
    return this.airportsService.updateAirport(request);
  }

  @GrpcMethod('AirportService', 'DeleteAirport')
  deleteAirport(request: DeleteAirportRequest): Promise<AirportResponse> {
    return this.airportsService.deleteAirport(request);
  }

  @GrpcMethod('AirportService', 'SearchAirports')
  SearchAirports(request: SearchAirportsRequest): Promise<SearchAirportsResponse> {
    return this.airportsService.SearchAirports(request);
  }
}

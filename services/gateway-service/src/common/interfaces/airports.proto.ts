export interface Airport {
  id: string;
  city: string;
  iata: string;
  name: string;
}

export interface CreateAirportRequest {
  city: string;
  iata: string;
  name: string;
}

export interface GetAirportRequest {
  id: string;
}

export interface ListAirportsRequest {
  page: number;
  limit: number;
}

export interface ListAirportsResponse {
  airports: Airport[];
  total: number;
}

export interface UpdateAirportRequest {
  id: string;
  city: string;
  iata: string;
  name: string;
}

export interface DeleteAirportRequest {
  id: string;
}

export interface AirportResponse {
  airport: Airport;
}

export interface SearchAirportsRequest {
  searchString: string;
  limit?: number;
}

export interface SearchAirportsResponse {
  airports: Airport[];
}

export interface AirportService {
  createAirport(request: CreateAirportRequest): Promise<AirportResponse>;
  getAirport(request: GetAirportRequest): Promise<AirportResponse>;
  listAirports(request: ListAirportsRequest): Promise<ListAirportsResponse>;
  updateAirport(request: UpdateAirportRequest): Promise<AirportResponse>;
  deleteAirport(request: DeleteAirportRequest): Promise<AirportResponse>;
  SearchAirports(request: any): Promise<any>;
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Airport } from './airports.schema';
import { Model } from 'mongoose';
import { CreateAirportDto } from 'src/common/dtos/create-airport.dto';
import { AirportResponse, CreateAirportRequest, DeleteAirportRequest, GetAirportRequest, ListAirportsRequest, ListAirportsResponse, SearchAirportsRequest, SearchAirportsResponse, UpdateAirportRequest } from 'src/common/interfaces/airports.proto';
import { RpcException } from '@nestjs/microservices';
import { Status } from '@grpc/grpc-js/build/src/constants';

import axios from 'axios';

@Injectable()
export class AirportsService {
  constructor(@InjectModel(Airport.name) private airportModel: Model<Airport>) {}

  async createAirport(request: CreateAirportRequest): Promise<AirportResponse> {
    try {
      const airport = new this.airportModel(request);
      const { id, city, iata, name } = await airport.save();
      return { airport: { id, city, iata, name } };
    } catch (err) {
      throw new RpcException({ code: Status.INTERNAL, message: err.message });
    }
  }

  async getAirport(request: GetAirportRequest): Promise<AirportResponse> {
    const airport = await this.airportModel.findById(request.id).exec();
    if (!airport) {
      throw new RpcException({ code: Status.NOT_FOUND, message: 'Airport not found' });
    }

    const { id, city, iata, name } = airport;
    return { airport: { id, city, iata, name } };
  }

  async listAirports(request: ListAirportsRequest): Promise<ListAirportsResponse> {
    const page = request.page > 0 ? request.page : 1;
    const limit = request.limit > 0 ? request.limit : 10;
    const [airports, total] = await Promise.all([
      this.airportModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.airportModel.countDocuments().exec(),
    ]);
    return {
      airports: airports.map(({ id, city, iata, name }) => ({ id, city, iata, name })),
      total,
    };
  }

  async updateAirport(request: UpdateAirportRequest): Promise<AirportResponse> {
    const airport = await this.airportModel.findByIdAndUpdate(request.id, request, { new: true }).exec();
    if (!airport) {
      throw new RpcException({ code: Status.NOT_FOUND, message: 'Airport not found' });
    }
    const { id, city, iata, name } = airport;
    return { airport: { id, city, iata, name } };
  }

  async deleteAirport(request: DeleteAirportRequest): Promise<AirportResponse> {
    const airport = await this.airportModel.findByIdAndDelete(request.id).exec();
    if (!airport) {
      throw new RpcException({ code: Status.NOT_FOUND, message: 'Airport not found' });
    }
    const { id, city, iata, name } = airport;
    return { airport: { id, city, iata, name } };
  }

  async SearchAirports(request: SearchAirportsRequest): Promise<any> {
    const regex = new RegExp(request.searchString, 'i');
    const limit = request.limit && request.limit > 0 ? request.limit : 10;

    let airports = await this.airportModel
      .find({ $or: [{ city: regex }, { name: regex }, { iata: regex }] })
      .limit(limit)
      .lean()
      .exec();

    if (!airports?.length) {
      const { data } = await axios.get(`https://api.sharetrip.net/api/v1/flight/search/airport?name=${request.searchString}`);

      const apiAirports = data?.response ?? [];

      if (Array.isArray(apiAirports) && apiAirports.length) {
        await this.airportModel.insertMany(apiAirports, { ordered: false });
        airports = apiAirports;
      }
    }

    return {
      airports: airports.map(({ _id, city, iata, name }) => ({
        id: _id?.toString?.(),
        city,
        iata,
        name,
      })),
    };
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BookingsService {
  constructor(@Inject('BOOKING_SERVICE') private readonly client: ClientProxy) {}

  async createBooking(flightNumber: string, passengerName: string) {
    const message = { flightNumber, passengerName };
    this.client.emit('book_flight', JSON.stringify(message));
  }
}

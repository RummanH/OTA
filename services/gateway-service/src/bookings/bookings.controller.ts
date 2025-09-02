import { Body, Controller, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingsService) {}

  @Post()
  async create(@Body() body: { flightNumber: string; passengerName: string }) {
    console.log(body)
    await this.bookingService.createBooking(body.flightNumber, body.passengerName);
    return { message: 'Booking request sent!' };
  }
}

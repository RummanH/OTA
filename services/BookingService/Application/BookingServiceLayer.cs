using BookingService.Models;
using BookingService.Repositories;

namespace BookingService.Application
{
    public class BookingServiceLayer(IBookingRepository repository)
    {

        public async Task<Booking> CreateBookingAsync(string flightNumber, string passengerName)
        {
            var booking = new Booking
            {
                FlightNumber = flightNumber,
                PassengerName = passengerName,
                BookingDate = DateTime.UtcNow,
                Status = "Confirmed"
            };

            return await repository.AddBookingAsync(booking);
        }

        public async Task<IEnumerable<Booking>> GetAllBookingsAsync()
        {
            return await repository.GetAllBookingsAsync();
        }

        public async Task<Booking?> GetBookingByIdAsync(int id)
        {
            return await repository.GetBookingByIdAsync(id);
        }
    }
}

using BookingService.Models;

namespace BookingService.Repositories
{
    public interface IBookingRepository
    {
        Task<Booking> AddBookingAsync(Booking booking);
        Task<Booking?> GetBookingByIdAsync(int id);
        Task<IEnumerable<Booking>> GetAllBookingsAsync();
    }
}

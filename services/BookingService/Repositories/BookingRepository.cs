using BookingService.Models;
using BookingService.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BookingService.Repositories
{
    public class BookingRepository(BookingDbContext context) : IBookingRepository
    {

        public async Task<Booking> AddBookingAsync(Booking booking)
        {
            context.Bookings.Add(booking);
            await context.SaveChangesAsync();
            return booking;
        }

        public async Task<Booking?> GetBookingByIdAsync(int id)
        {
            return await context.Bookings.FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<IEnumerable<Booking>> GetAllBookingsAsync()
        {
            return await context.Bookings.ToListAsync();
        }
    }
}

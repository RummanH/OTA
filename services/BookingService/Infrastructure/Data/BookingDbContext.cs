using BookingService.Models;
using Microsoft.EntityFrameworkCore;

namespace BookingService.Infrastructure.Data
{
    public class BookingDbContext(DbContextOptions<BookingDbContext> options) : DbContext(options)
    {
        public DbSet<Booking> Bookings { get; set; }
    }
}




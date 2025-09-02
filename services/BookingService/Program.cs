using BookingService.Application;
using BookingService.Repositories;
using BookingService.Messaging;
using BookingService.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<BookingDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IBookingRepository, BookingRepository>();
builder.Services.AddScoped<BookingServiceLayer>();

builder.Services.AddHostedService<RabbitMqConsumer>();

builder.Services.AddControllers();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<BookingDbContext>();
    db.Database.EnsureCreated();
}

app.MapControllers();

app.MapPost("/api/bookings", async (BookingServiceLayer service, BookFlightMessage request) =>
{
    var booking = await service.CreateBookingAsync(request.FlightNumber, request.PassengerName);
    return Results.Ok(booking);
});

app.MapGet("/api/bookings", async (BookingServiceLayer service) =>
{
    var bookings = await service.GetAllBookingsAsync();
    return Results.Ok(bookings);
});

app.Run();

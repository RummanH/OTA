using BookingService.Application;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace BookingService.Messaging
{
    public class RabbitMqConsumer : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly string _queueName;
        private readonly IConnection _connection;
        private readonly IModel _channel;

        public RabbitMqConsumer(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            _serviceProvider = serviceProvider;
            _queueName = configuration["RabbitMQ:QueueName"] ?? "book_flight";

            var factory = new ConnectionFactory
            {
                HostName = configuration["RabbitMQ:Host"] ?? "localhost",
                Port = int.Parse(configuration["RabbitMQ:Port"] ?? "5672"),
                UserName = configuration["RabbitMQ:Username"] ?? "guest",
                Password = configuration["RabbitMQ:Password"] ?? "guest",
                DispatchConsumersAsync = true
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            _channel.QueueDeclare(
                queue: _queueName,
                durable: false,
                exclusive: false,
                autoDelete: false,
                arguments: null
            );
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var consumer = new AsyncEventingBasicConsumer(_channel);

            consumer.Received += async (sender, e) =>
            {
                try
                {
                    var body = e.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    var request = JsonSerializer.Deserialize<BookFlightMessage>(message);

                    if (request != null)
                    {
                        using var scope = _serviceProvider.CreateScope();
                        var service = scope.ServiceProvider.GetRequiredService<BookingServiceLayer>();

                        var booking = await service.CreateBookingAsync(request.FlightNumber, request.PassengerName);

                        Console.WriteLine($"✅ Booking created via RabbitMQ: Id={booking.Id}, Flight={booking.FlightNumber}, Passenger={booking.PassengerName}");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"❌ Failed to process RabbitMQ message: {ex.Message}");
                }
            };

            _channel.BasicConsume(
                queue: _queueName,
                autoAck: true,
                consumer: consumer
            );

            return Task.CompletedTask;
        }

        public override void Dispose()
        {
            if (_channel.IsOpen)
                _channel.Close();
            if (_connection.IsOpen)
                _connection.Close();

            base.Dispose();
        }
    }
}

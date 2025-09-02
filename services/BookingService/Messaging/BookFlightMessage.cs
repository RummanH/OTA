namespace BookingService.Messaging
{
    public class BookFlightMessage
    {
        public string FlightNumber { get; set; } = string.Empty;
        public string PassengerName { get; set; } = string.Empty;
    }
}

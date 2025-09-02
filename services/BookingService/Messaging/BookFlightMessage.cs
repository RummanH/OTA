using System.Text.Json.Serialization;


namespace BookingService.Messaging
{
    public class BookFlightMessage
    {
        [JsonPropertyName("flightNumber")]
        public string FlightNumber { get; set; } = string.Empty;
        [JsonPropertyName("passengerName")]
        public string PassengerName { get; set; } = string.Empty;
    }
}

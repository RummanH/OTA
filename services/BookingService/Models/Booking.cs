namespace BookingService.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public string FlightNumber { get; set; } = string.Empty;
        public string PassengerName { get; set; } = string.Empty;
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Pending";
    }
}

import { Injectable } from '@nestjs/common';
import { VendorHttpService } from './vendor-http.service';
import { searchFlightsDto } from './dto/search.dto';
import { FlightSearchResult } from './interfaces/response.interface';
import { ResponseSabre } from './interfaces/sabre.interface';

@Injectable()
export class SabreService {
  constructor(private readonly httpVendor: VendorHttpService) {}

  async search(dto: searchFlightsDto): Promise<FlightSearchResult[]> {
    const url = 'http://103.95.97.155:98/air/SearchAirPaginate';
    const loginUrl = 'http://103.95.97.155:98/user/authenticateOTP';
    const loginRes = await this.httpVendor.post<ResponseSabre[]>(loginUrl, {
      username: 'zakariakhan237@gmail.com',
      password: 'Tt123#123##',
    });

    const payload = {
      JourneyType: dto.journeyType,
      Origin: dto.origin,
      Destination: dto.destination,
      DepartureDate: dto.departureDate,
      ReturnDate: dto.returnDate,
      ClassType: dto.classType,
      NoOfInfant: dto.noOfInfant,
      NoOfChildren: dto.noOfChildren,
      NoOfAdult: dto.noOfAdult,
      IsSpecialTexRedumtion: dto.isSpecialTexRedumtion,
      ChildrenAges: dto.childrenAges,
    };

    const response = await this.httpVendor.post<ResponseSabre[]>(url, payload, {
      headers: {
        Authorization: 'Bearer ' + loginRes.data?.Payload.access_token,
      },
    });

    if (!Array.isArray(response?.data.Payload)) {
      throw new Error('Invalid response format: expected an array');
    }

    return response?.data.Payload.map(
      (flight: ResponseSabre): FlightSearchResult => ({
        journeyDurations: flight.TotalTravelTimes.map((jt) => ({
          layoverDuration: jt.TotalLayoverTime,
          totalDuration: jt.TotalTravelDuration,
          stopCount: jt.NoOfStop,
        })),

        fareDetails: flight.FareBreakdown.map((fb) => ({
          discountAmount: fb.Discount,
          markupFee: fb.MarkupAmount,
          serviceFee: fb.ServiceCharge,
          passengerType: fb.PassengerType,
          totalFare: fb.TotalFare,
          passengerCount: fb.NoOfPassenger,
          baseFare: fb.BaseFare,
          taxAmount: fb.TotalTax,
          ait: fb.AIT,
        })),

        onwardFlights: flight.Onwards.map((seg) => ({
          originAirportName: seg.OriginAirPortName,
          destinationAirportName: seg.DestinationAirPortName,
          layoverTime: seg.LayoverTime,
          marketingCarrierCode: seg.Carrier,
          marketingCarrierName: seg.CarrierName,
          flightNumber: seg.FlightNumber,
          originCode: seg.Origin,
          destinationCode: seg.Destination,
          departureTime: seg.DepartureTime,
          arrivalTime: seg.ArrivalTime,
          duration: seg.TravelDuration,
          operatingCarrierCode: seg.OperatingCarrier,
          operatingCarrierName: seg.OperatingCarrierName,
          operatingFlightNumber: seg.OperatingFlightNumber,
          originTerminal: seg.OriginTerminal,
          destinationTerminal: seg.DestinationTerminal,
          bookingClass: seg.BookingCode,
          bookingAvailability: seg.BookingCount,
          cabinClass: seg.CabinClass,
          baggageAllowance: seg.AirBaggageAllowance,
          aircraftType: seg.Equipment,
          baggageDetails: seg.BaggageDetails,
        })),

        returnFlights: flight.Returns.map((seg) => ({
          originAirportName: seg.OriginAirPortName,
          destinationAirportName: seg.DestinationAirPortName,
          layoverTime: seg.LayoverTime,
          marketingCarrierCode: seg.Carrier,
          marketingCarrierName: seg.CarrierName,
          flightNumber: seg.FlightNumber,
          originCode: seg.Origin,
          destinationCode: seg.Destination,
          departureTime: seg.DepartureTime,
          arrivalTime: seg.ArrivalTime,
          duration: seg.TravelDuration,
          operatingCarrierCode: seg.OperatingCarrier,
          operatingCarrierName: seg.OperatingCarrierName,
          operatingFlightNumber: seg.OperatingFlightNumber,
          originTerminal: seg.OriginTerminal,
          destinationTerminal: seg.DestinationTerminal,
          bookingClass: seg.BookingCode,
          bookingAvailability: seg.BookingCount,
          cabinClass: seg.CabinClass,
          baggageAllowance: seg.AirBaggageAllowance,
          aircraftType: seg.Equipment,
          baggageDetails: seg.BaggageDetails,
        })),

        totalDiscount: flight.TotalDiscount,
        totalAit: flight.TotalAIT,
        totalMarkup: flight.TotalMarkup,
        totalPrice: flight.TotalPrice,
        baseFare: flight.BasePrice,
        ait: flight.AIT,
        currency: flight.APICurrencyType,
        adultCount: flight.Adults,
        childCount: flight.Childs,
        infantCount: flight.Infants,
        isRefundable: flight.IsRefundable,
        isBookable: flight.IsBookable,
        totalTax: flight.TotalTax,
        fareType: flight.FareType,
        tripType: flight.TripType,
        segmentCode: flight.SegmentCode,
        internalRefId: flight.OwnIDRef,
        providerKey: flight.IGXKey,
      }),
    );
  }
}

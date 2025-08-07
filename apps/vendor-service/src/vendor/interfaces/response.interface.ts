export interface FlightSearchResult {
  journeyDurations: JourneyDurationInfo[];
  fareDetails: FareInfo[];
  onwardFlights: FlightLeg[];
  returnFlights: FlightLeg[];
  totalDiscount: number;
  totalAit: number;
  totalMarkup: number;
  totalPrice: number;
  baseFare: number;
  ait: number;
  currency: string;
  adultCount: number;
  childCount: number;
  infantCount: number;
  isRefundable: boolean;
  isBookable: boolean;
  totalTax: number;
  fareType: string;
  tripType: string;
  segmentCode: string;
  internalRefId: string;
  providerKey: string;
}

export interface JourneyDurationInfo {
  layoverDuration: string;
  totalDuration: string;
  stopCount: number;
}

export interface FareInfo {
  discountAmount: number;
  markupFee: number;
  serviceFee: number;
  passengerType: string;
  totalFare: number;
  passengerCount: number;
  baseFare: number;
  taxAmount: number;
  ait: number;
}

export interface FlightLeg {
  originAirportName: string;
  destinationAirportName: string;
  layoverTime: string | null;
  marketingCarrierCode: string;
  marketingCarrierName: string;
  flightNumber: string;
  originCode: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  operatingCarrierCode: string;
  operatingCarrierName: string;
  operatingFlightNumber: string;
  originTerminal: string;
  destinationTerminal: string;
  bookingClass: string;
  bookingAvailability: string;
  cabinClass: string;
  baggageAllowance: string;
  aircraftType: string;
  baggageDetails: any[];
}

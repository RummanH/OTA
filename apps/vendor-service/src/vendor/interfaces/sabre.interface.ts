export interface ResponseSabre {
  TotalTravelTimes: TravelTimeSabre[];
  FareBreakdown: FareBreakdownSabre[];
  Onwards: FlightSegmentSabre[];
  Returns: FlightSegmentSabre[];
  TotalDiscount: number;
  TotalAIT: number;
  TotalMarkup: number;
  TotalPrice: number;
  BasePrice: number;
  AIT: number;
  APICurrencyType: string;
  Adults: number;
  Childs: number;
  Infants: number;
  IsRefundable: boolean;
  IsBookable: boolean;
  TotalTax: number;
  FareType: string;
  TripType: string;
  SegmentCode: string;
  OwnIDRef: string;
  IGXKey: string;
}

export interface TravelTimeSabre {
  TotalLayoverTime: string;
  TotalTravelDuration: string;
  NoOfStop: number;
}

export interface FareBreakdownSabre {
  Discount: number;
  MarkupAmount: number;
  ServiceCharge: number;
  PassengerType: string;
  TotalFare: number;
  NoOfPassenger: number;
  BaseFare: number;
  TotalTax: number;
  AIT: number;
}

export interface FlightSegmentSabre {
  OriginAirPortName: string;
  DestinationAirPortName: string;
  LayoverTime: string | null;
  Carrier: string;
  CarrierName: string;
  FlightNumber: string;
  Origin: string;
  Destination: string;
  DepartureTime: string;
  ArrivalTime: string;
  TravelDuration: string;
  OperatingCarrier: string;
  OperatingCarrierName: string;
  OperatingFlightNumber: string;
  OriginTerminal: string;
  DestinationTerminal: string;
  BookingCode: string;
  BookingCount: string;
  CabinClass: string;
  AirBaggageAllowance: string;
  Equipment: string;
  BaggageDetails: any[];
}

export interface FlightSearchRequestSabre {
  JourneyType: number;
  Origin: string;
  Destination: string;
  DepartureDate: string;
  ReturnDate: string;
  ClassType: string;
  NoOfInfant: number;
  NoOfChildren: number;
  NoOfAdult: number;
  IsSpecialTexRedumtion: boolean;
  ChildrenAges: number[] | null;
}

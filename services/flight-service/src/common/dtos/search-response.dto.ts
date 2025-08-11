import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class JourneyDurationInfoDto {
  @IsString()
  layoverDuration: string;

  @IsString()
  totalDuration: string;

  @IsInt()
  stopCount: number;
}

export class FareInfoDto {
  @IsNumber()
  discountAmount: number;

  @IsNumber()
  markupFee: number;

  @IsNumber()
  serviceFee: number;

  @IsString()
  passengerType: string;

  @IsNumber()
  totalFare: number;

  @IsInt()
  passengerCount: number;

  @IsNumber()
  baseFare: number;

  @IsNumber()
  taxAmount: number;

  @IsNumber()
  ait: number;
}

export class FlightLegDto {
  @IsString()
  originAirportName: string;

  @IsString()
  destinationAirportName: string;

  @IsOptional()
  @IsString()
  layoverTime: string | null;

  @IsString()
  marketingCarrierCode: string;

  @IsString()
  marketingCarrierName: string;

  @IsString()
  flightNumber: string;

  @IsString()
  originCode: string;

  @IsString()
  destinationCode: string;

  @IsString()
  departureTime: string;

  @IsString()
  arrivalTime: string;

  @IsString()
  duration: string;

  @IsString()
  operatingCarrierCode: string;

  @IsString()
  operatingCarrierName: string;

  @IsString()
  operatingFlightNumber: string;

  @IsString()
  originTerminal: string;

  @IsString()
  destinationTerminal: string;

  @IsString()
  bookingClass: string;

  @IsString()
  bookingAvailability: string;

  @IsString()
  cabinClass: string;

  @IsString()
  baggageAllowance: string;

  @IsString()
  aircraftType: string;

  @IsArray()
  baggageDetails: any[];
}

export class searchResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => JourneyDurationInfoDto)
  journeyDurations: JourneyDurationInfoDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FareInfoDto)
  fareDetails: FareInfoDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlightLegDto)
  onwardFlights: FlightLegDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlightLegDto)
  returnFlights: FlightLegDto[];

  @IsNumber()
  totalDiscount: number;

  @IsNumber()
  totalAit: number;

  @IsNumber()
  totalMarkup: number;

  @IsNumber()
  totalPrice: number;

  @IsNumber()
  baseFare: number;

  @IsNumber()
  ait: number;

  @IsString()
  currency: string;

  @IsInt()
  adultCount: number;

  @IsInt()
  childCount: number;

  @IsInt()
  infantCount: number;

  @IsBoolean()
  isRefundable: boolean;

  @IsBoolean()
  isBookable: boolean;

  @IsNumber()
  totalTax: number;

  @IsString()
  fareType: string;

  @IsString()
  tripType: string;

  @IsString()
  segmentCode: string;

  @IsString()
  internalRefId: string;

  @IsString()
  providerKey: string;
}

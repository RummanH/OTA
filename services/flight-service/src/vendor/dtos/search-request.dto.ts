import { IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export enum JourneyTypeEnum {
  ONE_WAY = 1,
  ROUND_TRIP = 2,
  MULTI_CITY = 3,
}

export enum ClassTypeEnum {
  ECONOMY = 'Economy',
  PREMIUM_ECONOMY = 'Premium Economy',
  BUSINESS = 'Business',
  FIRST = 'First Class',
}

export class searchRequestDto {
  @IsEnum(JourneyTypeEnum)
  journeyType: JourneyTypeEnum;

  @IsString()
  @MaxLength(3)
  origin: string;

  @IsString()
  @MaxLength(3)
  destination: string;

  @IsDateString()
  departureDate: string;

  @IsDateString()
  @IsOptional()
  returnDate?: string;

  @IsString()
  classType: string;

  @IsInt()
  @Min(0)
  noOfInfant: number;

  @IsInt()
  @Min(0)
  noOfChildren: number;

  @IsInt()
  @Min(1)
  noOfAdult: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  childrenAges?: number[] | null;
}

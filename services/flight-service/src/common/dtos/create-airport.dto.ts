import { IsString, Length } from 'class-validator';

export class CreateAirportDto {
  @IsString()
  city: string;

  @IsString()
  @Length(3, 3, { message: 'IATA code must be 3 letters' })
  iata: string;

  @IsString()
  name: string;
}

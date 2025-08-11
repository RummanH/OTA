import { Injectable } from '@nestjs/common';
import { searchRequestDto } from 'src/common/dtos/search-request.dto';
import { searchResponseDto } from 'src/common/dtos/search-response.dto';

@Injectable()
export class ExpressMapper {
  mapToExpressRequest(dto: searchRequestDto): searchRequestDto {
    return {
      journeyType: dto.journeyType,
      origin: dto.origin,
      destination: dto.destination,
      departureDate: dto.departureDate,
      returnDate: dto.returnDate ?? '',
      classType: dto.classType,
      noOfInfant: dto.noOfInfant,
      noOfChildren: dto.noOfChildren,
      noOfAdult: dto.noOfAdult,
      childrenAges: dto.childrenAges ?? null,
    };
  }

  mapToClientResponse(data: any[]): searchResponseDto[] {
    return data.map((d) => {
      return d as searchResponseDto;
    });
  }
}

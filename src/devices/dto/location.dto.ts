import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty()
  lat: string;

  @ApiProperty()
  lon: string;
}

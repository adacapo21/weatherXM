import { ApiProperty } from '@nestjs/swagger';
import { LocationDto } from '../devices/dto/location.dto';
import { AttributesDto } from '../devices/dto/attributes.dto';
import { CurrentWeatherDto } from '../devices/dto/current-weather.dto';

export class WeatherDeviceDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  location: LocationDto;

  @ApiProperty()
  attributes: AttributesDto;

  @ApiProperty()
  current_weather: CurrentWeatherDto;
}

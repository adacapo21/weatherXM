import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { LocationDto } from '../dto/location.dto';
import { AttributesDto } from '../dto/attributes.dto';
import { CurrentWeatherDto } from '../dto/current-weather.dto';

@Schema()
@ApiTags('devices')
export class Device {
  @Prop()
  @ApiProperty()
  id: string;

  @Prop()
  @ApiProperty()
  name: string;

  @Prop({ type: LocationDto })
  @ApiProperty()
  location: LocationDto;

  @Prop()
  @ApiProperty()
  attributes: AttributesDto;

  @Prop()
  @ApiProperty()
  current_weather: CurrentWeatherDto;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);

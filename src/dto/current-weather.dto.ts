import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CurrentWeatherDto {
  @Prop()
  @ApiProperty()
  id: string;

  @Prop()
  @ApiProperty()
  timestamp: Date;

  @Prop()
  @ApiProperty()
  temperature: number;

  @Prop()
  @ApiProperty()
  humidity: number;

  @Prop()
  @ApiProperty()
  precipitation: number;
}

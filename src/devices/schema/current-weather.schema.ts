import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
@ApiTags('current_weather')
export class Weather extends Document {
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

export const CurrentWeatherSchema = SchemaFactory.createForClass(Weather);

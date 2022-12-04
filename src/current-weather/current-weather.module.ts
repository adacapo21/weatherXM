import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrentWeatherSchema, CurrentWeather } from './current-weather.schema';
import { CurrentWeatherService } from './current-weather.service';
import { CurrentWeatherController } from './current-weather.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CurrentWeather.name, schema: CurrentWeatherSchema }
    ])
  ],
  controllers: [CurrentWeatherController],
  providers: [CurrentWeatherService]
})
export class CurrentWeatherModule {}

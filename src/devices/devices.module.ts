import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema, Device } from './devices.schema';
import { CurrentWeatherService } from '../current-weather/current-weather.service';
import {
  CurrentWeatherSchema,
  CurrentWeather
} from '../current-weather/current-weather.schema';
import { CurrentWeatherController } from '../current-weather/current-weather.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    MongooseModule.forFeature([
      { name: CurrentWeather.name, schema: CurrentWeatherSchema }
    ])
  ],
  controllers: [
    DevicesController,
    CurrentWeatherController
  ],
  providers: [
    DevicesService,
    CurrentWeatherService
  ]
})
export class DevicesModule {}

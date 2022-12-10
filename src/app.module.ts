import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { DevicesModule } from './devices/devices.module';
import { WeatherDeviceService } from './services/weather-device.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DevicesService } from './devices/devices.service';
import { Device, DeviceSchema } from './devices/devices.schema';
import {
  CurrentWeatherSchema,
  CurrentWeather
} from './current-weather/current-weather.schema';
import { CurrentWeatherModule } from './current-weather/current-weather.module';
import { CurrentWeatherService } from './current-weather/current-weather.service';

console.log(
  '****APP MODULE****',
  process.env.NODE_ENV,
  '***MONGO URL***',
  process.env.MONGO_URL
);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`
    }),
    DevicesModule,
    CurrentWeatherModule,
    HttpModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    MongooseModule.forFeature([
      { name: CurrentWeather.name, schema: CurrentWeatherSchema }
    ]),
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [
    WeatherDeviceService,
    ConfigService,
    HttpModule,
    DevicesService,
    CurrentWeatherService
  ]
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly weatherDeviceService: WeatherDeviceService,
    private readonly config: ConfigService
  ) {}
  async onApplicationBootstrap() {
    await this.weatherDeviceService.saveDevices();
  }
}

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

//const uri = "mongodb+srv://weather-xm:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.sskj7yy.mongodb.net/?retryWrites=true&w=majority";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      isGlobal: true
    }),
    DevicesModule,
    CurrentWeatherModule,
    HttpModule,
    MongooseModule.forRoot(`${process.env.MONGO_URL}`),
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
    console.log(
      '*** onApplicationBootstrap ***',
      process.env.MONGO_URL,
      process.env.URL_WEATHER_XM
    );
    await this.weatherDeviceService.saveDevices();
  }
}

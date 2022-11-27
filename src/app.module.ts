import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { DevicesModule } from './devices/devices.module';
import { WeatherDeviceService } from './services/weather-device.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { DevicesService } from './devices/devices.service';
import { Device, DeviceSchema } from './devices/devices.schema';

@Module({
  imports: [
    process.env.NODE_ENV === 'dev' ?
        MongooseModule.forRoot(`${process.env.MONGO_URL}`) :
        MongooseModule.forRoot(`${process.env.MONGO_URL_DOCKER}`),
    // cluster
    // MongooseModule.forRoot(
    //     `mongodb+srv://${process.env.MONGO_ATLAS_DB}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.sskj7yy.mongodb.net/?retryWrites=true&w=majority`
    // ),
    DevicesModule,
    HttpModule,
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [WeatherDeviceService, ConfigService, HttpModule, DevicesService]
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

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherDeviceService } from './weather-device.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [WeatherDeviceService],
  exports: [WeatherDeviceService]
})
export class WeatherDeviceModule {}

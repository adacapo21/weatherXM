import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { WeatherDeviceDto } from "../dto/weather-device.dto";

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() device: WeatherDeviceDto) {
    return this.devicesService.updateDeviceById(id, device);
  }
}

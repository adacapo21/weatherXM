import {
  Controller,
  Get,
  Body,
  Patch,
  Param
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Device } from './devices.schema';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  findOne(device: Device) {
    return this.devicesService.findByDevice(device);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() device: Device) {
    return this.devicesService.updateDeviceById(id, device);
  }
}

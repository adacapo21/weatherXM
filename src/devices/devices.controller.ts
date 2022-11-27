import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Device } from './schema/devices.schema';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() device: Device) {
    return this.devicesService.create(device);
  }

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(id);
  }
}

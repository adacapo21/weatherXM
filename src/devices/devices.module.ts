import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema, Device } from './devices.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }])
  ],
  controllers: [DevicesController],
  providers: [DevicesService]
})
export class DevicesModule {}

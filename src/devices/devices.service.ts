import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device } from './devices.schema';

@Injectable()
export class DevicesService {
  constructor(@InjectModel(Device.name) private deviceModel: Model<Device>) {}
  
  async insertBulk(device: Device[]) {
    const options = { ordered: true };
    return await this.deviceModel.insertMany(device, options);
  }

  findAll(): Promise<Device[]> {
    return this.deviceModel.find().exec();
  }

  async findByDevice(device: Device) {
    const foundDevice = await this.deviceModel.find({ id: device.id });

    if (!foundDevice) {
      throw new NotFoundException(`Device #${device.id} is not found`);
    }
    return foundDevice;
  }

  async findOne(id: number): Promise<Device> {
    const device = await this.deviceModel.findById({ _id: id }).exec();

    if (!device) {
      throw new NotFoundException(`Device #${id} is not found`);
    }
    return device;
  }

  async updateDeviceById(id: string, device: Device) {
    const updatedDevice = await this.deviceModel
      .findOneAndUpdate({ id: id }, { $set: device.current_weather }, { new: true })
      .exec();

    if (!updatedDevice) {
      throw new NotFoundException(`Device #${id} is not found`);
    }
    return updatedDevice;
  }
}

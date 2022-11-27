import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device } from './schema/devices.schema';

@Injectable()
export class DevicesService {
  constructor(@InjectModel(Device.name) private deviceModel: Model<Device>) {}
  create(device: Device): Promise<Device> {
    return new this.deviceModel(device).save();
  }
  async insertBulk(device: Device[]) {
    const options = { ordered: true };
    const devices = await this.deviceModel.insertMany(device, options);
    console.log('Devices inserted to DB', devices);
    // await this.deviceModel.deleteMany({}, options);
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
    console.log(id);
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

  remove(id: string) {
    return this.deviceModel.findByIdAndDelete({ _id: id });
  }
}

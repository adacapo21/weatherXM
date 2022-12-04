import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CurrentWeather } from './current-weather.schema';

@Injectable()
export class CurrentWeatherService {
  constructor(
    @InjectModel(CurrentWeather.name)
    private currentWeatherModel: Model<CurrentWeather>
  ) {}

  async createCurrentWeather(weather: CurrentWeather) {
    const current_weather = new this.currentWeatherModel(weather);
    return await current_weather.save();
  }

  async updateCurrentWeather(id: string, weather: CurrentWeather) {
    const updatedWeather = await this.currentWeatherModel
      .findOneAndUpdate({ id: id }, { $set: weather }, { new: true })
      .exec();

    if (!updatedWeather) {
      throw new NotFoundException(`Weather #${id} is not found`);
    }
    return updatedWeather;
  }

  findAll(): Promise<CurrentWeather[]> {
    return this.currentWeatherModel.find().exec();
  }

  async findOne(id: string): Promise<CurrentWeather> {
    const device = await this.currentWeatherModel.findById({ id: id }).exec();

    if (!device) {
      throw new NotFoundException(`Device #${id} is not found`);
    }
    return device;
  }
}

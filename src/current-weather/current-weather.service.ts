import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Weather } from './current-weather.schema';

@Injectable()
export class CurrentWeatherService {
    constructor(@InjectModel(Weather.name) private currentWeatherModel: Model<Weather>) {}
    
    async updateCurrentWeather(id: string, weather: Weather) {
        const updatedWeather = await this.currentWeatherModel
            .findOneAndUpdate({ id: id }, { $set: weather }, { new: true })
            .exec();
    
        if (!updatedWeather) {
            throw new NotFoundException(`Weather #${id} is not found`);
        }
        return updatedWeather;
    }
}
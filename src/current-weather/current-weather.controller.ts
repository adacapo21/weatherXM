import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { CurrentWeatherService } from './current-weather.service';
import { CurrentWeather } from './current-weather.schema';

@Controller('current_weather')
export class CurrentWeatherController {
  constructor(private readonly currentWeatherService: CurrentWeatherService) {}

  @Get()
  findAll() {
    return this.currentWeatherService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currentWeatherService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() weather: CurrentWeather) {
    return this.currentWeatherService.updateCurrentWeather(id, weather);
  }
}

import { HttpException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, of } from 'rxjs';
import { DevicesService } from '../devices/devices.service';
import { WeatherDeviceDto } from '../dto/weather-device.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CurrentWeatherDto } from '../devices/dto/current-weather.dto';
import { Device } from '../devices/schema/devices.schema';

export interface Location {
  lat: string;
  lon: string;
}
export interface currentWeather {
  timestamp: Date;
  temperature: number;
  humidity: number;
  precipitation: number;
  [key: string]: any;
}

export interface device {
  id: string;
  name: string;
  current_weather: CurrentWeatherDto;
}

@Injectable()
export class WeatherDeviceService {
  static errors = {
    RequestFailed: class extends Error {} as ErrorConstructor
  };

  constructor(
    private config: ConfigService,
    private httpService: HttpService,
    private devicesService: DevicesService
  ) {}

  async getWeatherDevicesFromEndpoint(): Promise<WeatherDeviceDto[]> {
    const apiUrl = this.config.get('URL_WEATHER_XM');
    const request = this.httpService
      .request({
        url: 'https://wxm-api-mock.herokuapp.com/api/v1/devices',
        method: 'get',
        responseType: 'json',
        maxRedirects: 0
      })
      .pipe(
        catchError((e) => {
          throw new HttpException(
            `An error occured for device with ID #${e.response.data.id} with code ${e.response.data.code}`,
            e.response.code
          );
        })
      );
    const resp = await firstValueFrom(request);
    if (resp.status !== 200) {
      throw new WeatherDeviceService.errors.RequestFailed(
        'Failed to get Devices'
      );
    }
    const devices = resp.data;
    if (!devices) {
      throw new WeatherDeviceService.errors.RequestFailed(
        'Failed to get Devices'
      );
    }
    return devices;
  }

  // save devices to DB
  async saveDevices(): Promise<WeatherDeviceDto[]> {
    const devices = await this.getWeatherDevicesFromEndpoint();
    await this.devicesService.insertBulk(devices);
    return devices;
  }

  async getDeviceByIdFromEndpoint(deviceId) {
    const request = this.httpService
      .request({
        url: `https://wxm-api-mock.herokuapp.com/api/v1/devices/${deviceId}`,
        method: 'get',
        responseType: 'json',
        maxRedirects: 0
      })
      .pipe(
        catchError((e) => {
          throw new HttpException(
            `${e.response.data.message} in path ${e.response.data.path} with error ${e.response.data.code}`,
            e.response.code
          );
        })
      );
    const resp = await firstValueFrom(request);
    if (resp.status !== 200) {
      throw new WeatherDeviceService.errors.RequestFailed(
        'Failed to get Device'
      );
    }
    const device = resp.data;
    if (!device) {
      throw new WeatherDeviceService.errors.RequestFailed(
        'Failed to get Device'
      );
    }
    return device;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async retrieveWeatherByDeviceId() {
    // get devices from DB
    const devicesDB = await this.devicesService.findAll();
    if (!devicesDB) {
      throw new WeatherDeviceService.errors.RequestFailed(
        'Failed to get Devices'
      );
    }

    const devicesIds = devicesDB.map((device) => device.id);
    
    for (const deviceDB of devicesDB) {
      // call endpoint for each device id (for loop)
      const device = await this.getDeviceByIdFromEndpoint(deviceDB.id);
      // save or update device with NEW data
      await this.devicesService.updateDeviceById(
        deviceDB.id,
        device
      );
    }
    
    // update current weather for each device in another collection in DB
    // getWeatherDevices and hold Device IDS
    // find ALL device Ids - query devicesModel
    // update device current weather

    return devicesDB;
  }
}

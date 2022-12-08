import {HttpException, Injectable, Logger} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ConfigService} from '@nestjs/config';
import {catchError, firstValueFrom} from 'rxjs';
import {DevicesService} from '../devices/devices.service';
import {WeatherDeviceDto} from '../dto/weather-device.dto';
import {Cron, CronExpression} from '@nestjs/schedule';
import {CurrentWeatherService} from '../current-weather/current-weather.service';
import {CurrentWeather} from '../current-weather/current-weather.schema';

@Injectable()
export class WeatherDeviceService {
  static errors = {
    RequestFailed: class extends Error {} as ErrorConstructor
  };
  constructor(
    private config: ConfigService,
    private httpService: HttpService,
    private devicesService: DevicesService,
    private currentWeatherService: CurrentWeatherService
  ) {}

  /** Get Devices from /devices endpoint **/
  async getWeatherDevicesFromEndpoint(): Promise<WeatherDeviceDto[]> {
    const apiUrl = this.config.get('URL_WEATHER_XM');
    const request = this.httpService
      .request({
        url: apiUrl,
        method: 'get',
        responseType: 'json',
        maxRedirects: 0,
        validateStatus: function (status: number) {
          return status === 200;
        }
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

  /** Save devices to DB in Application start **/
  async saveDevices(): Promise<WeatherDeviceDto[] | void> {
    return await this.getWeatherDevicesFromEndpoint().then((devices) => {
        this.devicesService.insertBulk(devices);
        for (const device of devices) {
            device.current_weather.id = device.id;
            this.currentWeatherService.createCurrentWeather(
                <CurrentWeather>device.current_weather
            );
        }
        return devices;
    }).catch((error)=> {
        Logger.error(`${error.message}!\t`);
    });
  }

  /** Get Device from /devices/deviceId endpoint **/
  async getDeviceByIdFromEndpoint(deviceId) {
      const apiUrl = this.config.get('URL_WEATHER_XM');
      const request = this.httpService
      .request({
        url: `${apiUrl}/${deviceId}`,
        method: 'get',
        responseType: 'json',
        maxRedirects: 0,
        validateStatus: function (status: number) {
          return status === 200;
        }
      })
      .pipe(
        catchError((e) => {
          throw new HttpException(
            `${e.response.data.message} in path ${e.response.data.path} with error ${e.response.data.code}`,
            e.response.code
          );
        })
      );
      const device = await firstValueFrom(request)
        .then((res) => {
            return res.data;
        })
        .catch((e) => {
            Logger.error(`${e.name}! ` + e.message);
        });
    if (!device) {
      throw new WeatherDeviceService.errors.RequestFailed(
          `Failed to get Device with id ${deviceId}`
      );
    }
    return device;
  }

  /**
   *  Cron each minute
   *  GET all devices from DB
   *  Call endpoint devices/deviceId - getDeviceByIdFromEndpoint
   *  Update Device Current Weather
   *  **/
  @Cron(CronExpression.EVERY_MINUTE)
  async retrieveWeatherByDeviceId() {
    // get devices from DB
    const devicesDB = await this.devicesService.findAll();
    if (!devicesDB) {
      throw new WeatherDeviceService.errors.RequestFailed(
        'Failed to get Devices'
      );
    }

    for (const deviceDB of devicesDB) {
      try {
        await this.getDeviceByIdFromEndpoint(
            deviceDB.id
        ).then((deviceById) => {
            this.devicesService.updateDeviceById(
                deviceDB.id,
                deviceById
            );
            // save or update device with NEW current weather data
            this.currentWeatherService.updateCurrentWeather(
                deviceDB.id,
                deviceById.current_weather
            );
        }).catch((error) => {
            Logger.error(error.message);
        });
      } catch {
        throw new WeatherDeviceService.errors.RequestFailed(
          `Failed to get Device ${deviceDB.id}`
        );
      }
    }

    return devicesDB;
  }
}

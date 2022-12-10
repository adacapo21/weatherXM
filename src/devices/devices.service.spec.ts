import { Test, TestingModule } from '@nestjs/testing';
import { DevicesService } from './devices.service';
import { WeatherDeviceDto } from '../dto/weather-device.dto';
import { DeviceSchema, Device } from './devices.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrentWeather, CurrentWeatherSchema} from "../current-weather/current-weather.schema";
import { CurrentWeatherService} from "../current-weather/current-weather.service";
import mongoose from "mongoose";

describe('DevicesService', () => {
  let service: DevicesService;
  const device: WeatherDeviceDto = {
    id: "b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6",
    name: "Unhappy Turquoise Tulip",
    location: {
      lat: '3.428302',
      lon: '42.59623'
    },
    attributes: {
      lastActiveAt: new Date("2022-12-03T22:22:37.371Z")
    },
    current_weather: {
      id: "b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6",
      timestamp: new Date("2022-12-03T22:22:37.371Z"),
      temperature: 45.9,
      humidity: 72,
      precipitation: 0.72
    }
  };
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/weatherXMTest'),
        MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
        MongooseModule.forFeature([
          { name: CurrentWeather.name, schema: CurrentWeatherSchema }
        ])
      ],
      providers: [
        DevicesService,
        CurrentWeatherService
      ]
    }).compile();

    service = module.get<DevicesService>(DevicesService);
  });
  afterAll(async () => {
    // Drop the database after all tests
    await mongoose.connection.close();
  });

  it('should Insert device', async () => {
    const devices = await service.insertBulk([device]);
    expect(devices).not.toBeNull()
    expect(devices[0].name).toEqual(device.name)
  });
  
 
  it('should list Devices', async () => {
    const devices = await service.findAll();
    expect(devices.length).toBeGreaterThan(1)
  })
  
  it('Should Find Device by Id', async () => {
    const foundDevice = await service.findOne(device.id);
    expect(foundDevice.name).toBe(device.name)
  })
});

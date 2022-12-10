import { Test, TestingModule } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { WeatherDeviceDto } from '../dto/weather-device.dto';

const device = {
  id: 'b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6',
  name: 'Mean Red Schoolhouse',
  location: {
    lat: '12.800698',
    lon: '138.549364'
  },
  attributes: {
    lastActiveAt: new Date('2022-12-03T22:22:37.371Z')
  },
  current_weather: {
    id: 'b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6',
    timestamp: new Date('2022-12-03T22:22:37.371Z'),
    temperature: 26.8,
    humidity: 82,
    precipitation: 0.85
  }
};
const updatedDevice: WeatherDeviceDto = {
  id: 'b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6',
  name: 'Unhappy Turquoise Tulip',
  location: {
    lat: '3.428302',
    lon: '42.59623'
  },
  attributes: {
    lastActiveAt: new Date('2022-12-03T22:22:37.371Z')
  },
  current_weather: {
    id: 'b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6',
    timestamp: new Date('2022-12-03T22:22:37.371Z'),
    temperature: 45.9,
    humidity: 72,
    precipitation: 0.72
  }
};

describe('DevicesController', () => {
  let devicesController: DevicesController;
  let devicesService: DevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [
        {
          provide: DevicesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 'b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6',
                name: 'Mean Red Schoolhouse',
                location: {
                  lat: '12.800698',
                  lon: '138.549364'
                },
                attributes: {
                  lastActiveAt: new Date('2022-12-03T22:22:37.371Z')
                },
                current_weather: {
                  id: 'b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6',
                  timestamp: new Date('2022-12-03T22:22:37.371Z'),
                  temperature: 26.8,
                  humidity: 82,
                  precipitation: 0.85
                }
              },
              {
                id: 'fa7516b5-5845-410f-99b5-689f5d1fa29f',
                name: 'Prudent Orange Fry',
                location: {
                  lat: '12.800698',
                  lon: '138.549364'
                },
                attributes: {
                  lastActiveAt: '2022-12-03T22:22:37.371Z'
                },
                current_weather: {
                  timestamp: '2022-12-03T23:39:36.625Z',
                  temperature: 26.8,
                  humidity: 82,
                  precipitation: 0.85,
                  precipitation_probability: 46,
                  wind_speed: 29.9,
                  wind_gust: 73.5,
                  wind_direction: 257,
                  pressure: 978.3,
                  uv_index: 1,
                  cloud_cover: 49,
                  feels_like: 25.3,
                  icon: 'not-available',
                  id: 'b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6'
                }
              }
            ]),
            findOne: jest
              .fn()
              .mockImplementation(() => Promise.resolve(device)),
            updateDeviceById: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve(updatedDevice)
              ),
            insertBulk: jest
              .fn()
              .mockImplementation((devices: WeatherDeviceDto[]) =>
                Promise.resolve({ ...devices })
              )
          }
        }
      ]
    }).compile();

    devicesController = module.get<DevicesController>(DevicesController);
    devicesService = module.get<DevicesService>(DevicesService);
  });

  describe('findAll Devices', () => {
    it('should get an array of Devices', () => {
      expect(devicesController.findAll()).resolves.toEqual([
        {
          id: 'b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6',
          name: 'Mean Red Schoolhouse',
          location: {
            lat: '12.800698',
            lon: '138.549364'
          },
          attributes: {
            lastActiveAt: new Date('2022-12-03T22:22:37.371Z')
          },
          current_weather: {
            id: 'b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6',
            timestamp: new Date('2022-12-03T22:22:37.371Z'),
            temperature: 26.8,
            humidity: 82,
            precipitation: 0.85
          }
        },
        {
          id: 'fa7516b5-5845-410f-99b5-689f5d1fa29f',
          name: 'Prudent Orange Fry',
          location: {
            lat: '12.800698',
            lon: '138.549364'
          },
          attributes: {
            lastActiveAt: '2022-12-03T22:22:37.371Z'
          },
          current_weather: {
            timestamp: '2022-12-03T23:39:36.625Z',
            temperature: 26.8,
            humidity: 82,
            precipitation: 0.85,
            precipitation_probability: 46,
            wind_speed: 29.9,
            wind_gust: 73.5,
            wind_direction: 257,
            pressure: 978.3,
            uv_index: 1,
            cloud_cover: 49,
            feels_like: 25.3,
            icon: 'not-available',
            id: 'b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6'
          }
        }
      ]);
    });
  });

  describe('findOne Device', () => {
    it('should get a Device by its id', async () => {
      await expect(devicesController.findOne(device.id)).resolves.toEqual(
        device
      );
    });
  });

  describe('Update Device By Id', () => {
    it('should update a Device by its id', async () => {
      await expect(
        devicesController.update(device.id, updatedDevice)
      ).resolves.toEqual(updatedDevice);
    });
  });
});

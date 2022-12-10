import { Test, TestingModule } from '@nestjs/testing';
import { HttpService, HttpModule } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { WeatherDeviceService } from './weather-device.service';
import * as assert from 'assert';
import { v4 as uuidv4 } from 'uuid';
import { DevicesService } from "../devices/devices.service";
import { CurrentWeatherService} from "../current-weather/current-weather.service";
import { MongooseModule} from "@nestjs/mongoose";
import { Device, DeviceSchema} from "../devices/devices.schema";
import { CurrentWeather, CurrentWeatherSchema} from "../current-weather/current-weather.schema";
import * as sinon from 'sinon';
import { of } from 'rxjs';
import {WeatherDeviceDto} from "../dto/weather-device.dto";

const configServiceMock: { get?: sinon.SinonSpy } = {};
const httpServiceMock: { request?: sinon.SinonSpy } = {};

describe('DevicesService',  () => {
    const expectedDevices : WeatherDeviceDto[] = [
        {
            id: "b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6",
            name: "Mean Red Schoolhouse",
            location: {
                lat: '12.800698',
                lon: '138.549364'
            },
            attributes: {
                lastActiveAt: new Date("2022-12-03T22:22:37.371Z")
            },
            current_weather: {
                id: "b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6",
                timestamp: new Date("2022-12-03T22:22:37.371Z"),
                temperature: 26.8,
                humidity: 82,
                precipitation: 0.85
            }
        },
        {
            id: "b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6",
            name: "Unhappy Turquoise Tulip",
            location: {
                lat: "3.428302",
                lon: "42.59623"
            },
            attributes: {
                lastActiveAt: new Date("1670106157371")
            },
            current_weather: {
                id: "b9bfae8b-f5ae-4a95-9ba4-98a978c26fc6",
                timestamp: new Date("1670106157371"),
                temperature: 45.9,
                humidity: 72,
                precipitation: 0.72
            }
        }
    ]
    let service: WeatherDeviceService;
    let httpService: HttpService;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                HttpModule,
                MongooseModule.forRoot('mongodb://localhost:27017/weatherXM_Test'),
                MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
                MongooseModule.forFeature([
                    { name: CurrentWeather.name, schema: CurrentWeatherSchema }
                ])
            ],
            providers: [
                WeatherDeviceService,
                {
                    provide: ConfigService,
                    useValue: configServiceMock
                },
                {
                    provide: HttpService,
                    useValue: httpServiceMock
                },
                DevicesService,
                CurrentWeatherService
            ],
        }).compile();
        
        httpService = module.get<HttpService>(HttpService);
        service = module.get(WeatherDeviceService);
    });
    it('should get weather devices from endpoint', async () => {
        const vars = {
            URL_WEATHER_XM: uuidv4()
        };
        configServiceMock.get = sinon.fake((key) => vars[key]);
        httpServiceMock.request = sinon.fake.returns(
            of({
                status: 200,
                data: expectedDevices
            })
        );
        const devices = await service.getWeatherDevicesFromEndpoint();
        assert.deepEqual(devices, expectedDevices);
    });
    
    it('should throw an error if the HTTP request fails', async () => {
        const vars = {
            URL_WEATHER_XM: uuidv4()
        };
        configServiceMock.get = sinon.fake((key) => vars[key]);
        // Configure the fetch mock to return a 404 error
        httpServiceMock.request = sinon.fake.returns(
            of({
                status: 404,
                error: { message: 'Failed to get Devices'}
            })
        );
        
        try {
            // The getWeatherDevicesFromEndpoint method should throw an error
            // when the HTTP request fails
            await service.getWeatherDevicesFromEndpoint();
            assert.fail('Failed to get Devices');
        } catch (error) {
            // Assert that the error thrown is the expected RequestFailed error
            assert.equal(error.message, 'Failed to get Devices');
        }
    });
})


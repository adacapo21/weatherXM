import { WeatherDeviceDto } from '../../src/dto/weather-device.dto';

export const devicesStub = (): WeatherDeviceDto => {
    return {
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
    };
}
import { Test, TestingModule } from '@nestjs/testing';
import { WeatherDeviceService } from './weather-device.service';

describe('Weather Device Service', () => {
    let service: WeatherDeviceService;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WeatherDeviceService]
        }).compile();
        
        service = module.get<WeatherDeviceService>(WeatherDeviceService);
    });
    
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

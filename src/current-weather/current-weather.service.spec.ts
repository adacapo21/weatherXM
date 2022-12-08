import { Test, TestingModule } from '@nestjs/testing';
import { CurrentWeatherService } from './current-weather.service';

describe('Current Weather Service', () => {
    let service: CurrentWeatherService;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CurrentWeatherService]
        }).compile();
        
        service = module.get<CurrentWeatherService>(CurrentWeatherService);
    });
    
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

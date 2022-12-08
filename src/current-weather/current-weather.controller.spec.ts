import { Test, TestingModule } from "@nestjs/testing";
import { CurrentWeatherController } from "./current-weather.controller";
import { CurrentWeatherService } from "./current-weather.service";


describe("Current Weather Controller", () => {
    let currentWeatherController: CurrentWeatherController;
    
    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [CurrentWeatherController],
            providers: [
                CurrentWeatherService,
            ],
        }).compile();
        currentWeatherController = app.get<CurrentWeatherController>(CurrentWeatherController);
    });
});
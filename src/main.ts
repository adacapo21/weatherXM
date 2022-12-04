import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from './common/logger.service';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger
  });

  const config = new DocumentBuilder()
    .setTitle('Weather XM')
    .setDescription('The Weather XM API description')
    .setVersion('1.0')
    .addTag('Weather XM')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    logger.log('Check WeatherXM API on http://localhost:3000/api');
  });
}
bootstrap();

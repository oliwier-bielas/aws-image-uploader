import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  const frontendUrl = configService.getOrThrow<string>('FRONTEND_URL');

  app.enableCors({
    origin: frontendUrl,
  });

  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);
}
bootstrap();

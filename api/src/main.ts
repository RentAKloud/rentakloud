import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: [configService.get('FRONT_URL'), configService.get('ADMIN_URL')],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('RentAKloud API')
    .setDescription('Documentation for RentAKloud API.')
    .setVersion('1.0')
    // .addTag('cloud')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const PORT = configService.get('PORT');
  await app.listen(PORT);
}
bootstrap();

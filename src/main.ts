import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Configuration de Swagger (OpenAPI)
  const config = new DocumentBuilder()
    .setTitle(`Les tresors d'Ille et Vilaine API`)
    .setDescription('Documentation de l\'API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Active le pipe de validation global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Supprime les propriétés non définies dans le DTO
    forbidNonWhitelisted: true, // Retourne une erreur si des propriétés non attendues sont présentes
    transform: true, // Transforme les données en instances des DTO
  }));

  // Enable Cors
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:8081', 'https://ton-front-prod.fr'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ["1","2"]
  });
  app.setGlobalPrefix('api');


  const config = new DocumentBuilder()
    .setTitle('All Apis')
    .setDescription('The All API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //pipe
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: false
    }
  ));

  
  await app.listen(process.env.PORT);
}
bootstrap();


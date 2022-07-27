import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //pipe 생성
  app.useGlobalPipes(new ValidationPipe({
    //options
    whitelist: true,
    forbidNonWhitelisted: true,
    //transform : 원래 param or body에서 받는 거는 string인데,
    //true로 하면 실제 원하는 값으로 변경해줌.
    transform: true,
  }));
  await app.listen(3000); //3000번 포트 리스닝
}
bootstrap();

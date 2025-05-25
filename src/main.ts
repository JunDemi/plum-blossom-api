import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 유효성 검사 파이프
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성은 제거
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 에러 발생
      transform: true, // 요청 객체를 DTO로 변환 (id:string -> id:number 등)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

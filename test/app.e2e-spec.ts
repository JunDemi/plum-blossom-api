import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 유효성 검사 파이프
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // DTO에 정의되지 않은 속성은 제거
        forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 에러 발생
        transform: true, // 요청 객체를 DTO로 변환 (id:string -> id:number 등)
      }),
    );
    await app.init();
  });

  // // default url
  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

  // // plum
  // describe('/plum', () => {
  //   // plum 전체 조회
  //   it('GET', () => {
  //     return request(app.getHttpServer())
  //       .get('/plum')
  //       .expect(200)
  //       .expect((res) => {
  //         expect(res.body).toBeInstanceOf(Array);
  //       });
  //   });

  //   // plum 객체 생성
  //   it('POST 201', () => {
  //     return request(app.getHttpServer())
  //       .post('/plum')
  //       .send({
  //         title: 'Test Plum',
  //         genre: ['test'],
  //         year: 2025,
  //       })
  //       .expect(201);
  //   });
  //    // plum 객체 생성
  //   it('POST 400', () => {
  //     return request(app.getHttpServer())
  //       .post('/plum')
  //       .send({
  //         title: 'Test Plum',
  //         genre: ['test'],
  //         year: 2025,
  //         other: 'invalid', // 잘못된 필드
  //       })
  //       .expect(400);
  //   });
  //   // 404
  //   it('DELETE', () => {
  //     return request(app.getHttpServer()).delete('/plum').expect(404);
  //   });
  // });

  // describe('/plum/:id', () => {
  //   // plum 상세 조회, 수정, 삭제
  //   it('GET 200', () => {
  //     return request(app.getHttpServer()).get('/plum/1').expect(200);
  //   });
  //   it('GET 404', () => {
  //     return request(app.getHttpServer()).get('/plum/999').expect(404);
  //   });
  //   it('PATCH 200', () => {
  //     return request(app.getHttpServer())
  //       .patch('/plum/1')
  //       .send({
  //         title: 'Updated Plum',
  //         genre: ['updated'],
  //         year: 2026,
  //       })
  //       .expect(200);
  //   });
  //   it('DELETE 200', () => {
  //     return request(app.getHttpServer()).delete('/plum/1').expect(200);
  //   });
  // });
});

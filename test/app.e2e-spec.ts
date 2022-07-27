import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    //pipe 생성
    app.useGlobalPipes(new ValidationPipe({
      //options
      whitelist: true,
      forbidNonWhitelisted: true,
      //transform : 원래 param or body에서 받는 거는 string인데,
      //true로 하면 실제 원하는 값으로 변경해줌.
      transform: true,
    }));
    await app.init();
  });

  //root url test
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  //movies url test
  describe('/movies', () => {
    it('GET', () => { //GET TEST
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });
    it('POST 201', () => { //POST TEST
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });
    it('POST 400', () => { //POST TEST
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
          other: 'thina'
        })
        .expect(400);
    });
    it('DELETE', () => { //DELETE TEST
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404);
    })
  });

  //movies/id url test
  describe('/movies/:id', () => {
    //it.todo() : 말 그대로 해야할 테스트 목록
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({title:'Updated Test', year:2022, genres:['Updated Test']})
        .expect(200);
    });
    it('PATCH 404', () => {
      return request(app.getHttpServer())
        .patch('/movies/999')
        .send({title:'Updated Test', year:2022, genres:['Updated Test']})
        .expect(404);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200);
    });
    it('DELETE 404', () => {
      return request(app.getHttpServer())
        .delete('/movies/999')
        .expect(404);
    });
  })
});

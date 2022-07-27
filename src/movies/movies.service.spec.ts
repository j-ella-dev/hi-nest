import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => { //테스트 하기 전에 실행되는 곳
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => { //it : indivisual test
    expect(service).toBeDefined();
  });

  //getAll 함수의 결과값이 Array 인지 테스트
  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  //getOne 함수 실행 테스트
  describe("getOne", () => {
    //결과값이 정상적으로 나오는지 테스트
    it("should return a movie", () => {
      //테스트를 위한 Movie 만들기 (없으면 에러)
      service.create({
        title:'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(1).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    //에러가 정상적으로 나오고 있는지 테스트
    it("should throw 404 error", () => {
      try {
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  //deleteOne 함수 실행 테스트
  describe("deleteOne", () => {
    //삭제가 정상적인지 테스트
    it("deletes a movie", () => {
      //테스트를 위한 Movie 만들기 (없으면 에러)
      service.create({
        title:'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      //삭제 후의 Movie 개수 비교
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    //에러가 정상적으로 나오고 있는지 테스트
    it("should return a 404", () => {
      try {
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
      }
    });
  });

  //create 함수 실행 테스트
  describe("create", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title:'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      //create  후의 Movie 개수 비교
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  //update 함수 실행 테스트
  describe("update", () => {
    it("should update a movie", () => {
      service.create({
        title:'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, {title: 'Updated Test'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
    //에러가 정상적으로 나오고 있는지 테스트
    it("should throw a NotFoundException", () => {
      try {
        service.update(999, {title: 'Updated Test'});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
      }
    });
  });
});

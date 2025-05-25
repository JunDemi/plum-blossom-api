import { Test, TestingModule } from '@nestjs/testing';
import { PlumService } from './plum.service';
import { NotFoundException } from '@nestjs/common';

describe('PlumService', () => {
  let service: PlumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlumService],
    }).compile();

    service = module.get<PlumService>(PlumService);
  });

  // 기본 테스트
  it('기본 서비스 작동됨', () => {
    expect(service).toBeDefined();
  });

  // 전체 조회 테스트
  describe('getAll', () => {
    it('getAll -> 배열이어야 함', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  // 상세 조회 테스트
  describe('getOne', () => {
    // 상세 1
    it('getOne -> 형식에 맞는 객체이어야 함', () => {
      service.createOne({
        title: 'Test Plum',
        genre: ['test'],
        year: 2025,
      });
      const result = service.getOne(1);
      expect(result).toBeDefined();
      expect(result.id).toEqual(1);
    });
    // 404
    it('getOne -> 404에러가 발생해야 함', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  // 생성 테스트
  describe('createOne', () => {
    it('createOne -> 생성된 객체가 반환되어야 함', () => {
      const before = service.getAll().length;
      service.createOne({
        title: 'New Plum',
        genre: ['new'],
        year: 2025,
      });
      const after = service.getAll().length;

      expect(after).toBeGreaterThan(before);
    });
  });

  // 삭제 테스트
  describe('deleteOne', () => {
    it('deleteOne -> 객체가 삭제되어야 함', () => {
      service.createOne({
        title: 'Delete Plum',
        genre: ['delete'],
        year: 2025,
      });

      const all = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();

      expect(afterDelete.length).toBeLessThan(all.length);
    });

    // 404
    it('deleteOne -> 404에러가 발생해야 함', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  // 수정 테스트
  describe('updateOne', () => {
    it('updateOne -> 수정된 객체가 반환되어야 함', () => {
      service.createOne({
        title: 'Update Plum',
        genre: ['update'],
        year: 2025,
      });
      service.updateOne(1, {
        title: 'Updated Plum',
      });
      const updated = service.getOne(1);
      expect(updated.title).toEqual('Updated Plum');
    });

    // 404
    it('updateOne -> 404에러가 발생해야 함', () => {
      try {
        service.updateOne(999, { title: 'Nonexistent' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});

import { Injectable, NotFoundException } from '@nestjs/common';
import { IPlum } from './plum.interfaces';
import { CreatePlumDto, UpdatePlumDto } from './plum.dto';

@Injectable()
export class PlumService {
  private plums: IPlum[] = [];

  // 전체 조회
  getAll(): IPlum[] {
    return this.plums;
  }

  // 상세 조회
  getOne(id: number) {
    const plum = this.plums.find((p) => p.id === id);

    if (!plum) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    } else {
      return plum;
    }
  }

  // 생성
  createOne(postData: CreatePlumDto) {
    this.plums.push({
      ...postData,
      id: this.plums.length + 1,
    });
    return;
  }

  // 삭제
  deleteOne(id: number) {
    this.getOne(id);
    this.plums = this.plums.filter((p) => p.id !== id);
    return;
  }

  // 수정
  updateOne(id: number, patchData: UpdatePlumDto) {
    const current = this.getOne(id);
    this.deleteOne(id);
    this.plums.push({
      ...current,
      ...patchData,
      id: id,
    });
  }
}

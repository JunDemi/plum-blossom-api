import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from './member.entity';
import { Repository } from 'typeorm';
import {
  CreateMemberDTO,
  DeleteMemberDTO,
  UpdateMemberDTO,
} from './member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepo: Repository<MemberEntity>,
  ) {}

  //멤버 조회
  getMembers(): Promise<MemberEntity[]> {
    return this.memberRepo.find({
      order: {
        id: 'ASC',
      },
      select: {
        id: true,
        name: true,
        job: true,
        isManager: true,
      },
    });
  }

  //단일 멤버 조회
  getOneMember(id: number): Promise<MemberEntity | null> {
    const member = this.memberRepo.findOneBy({ id });
    if (!member) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }
    return member;
  }

  //맴버 생성
  createMember(createMemberDTO: CreateMemberDTO) {
    const newMember = this.memberRepo.create(createMemberDTO);
    return this.memberRepo.save(newMember);
  }

  //멤버 수정
  updateMember({ id, data }: UpdateMemberDTO) {
    return this.memberRepo.update(id, { ...data });
  }

  //멤버 삭제
  deleteMember({ id }: DeleteMemberDTO) {
    return this.memberRepo.delete(id);
  }
}

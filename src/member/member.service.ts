import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './member.entity';
import { Repository } from 'typeorm';
import {
  CreateMemberDTO,
  DeleteMemberDTO,
  UpdateMemberDTO,
} from './member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  //멤버 조회
  getMembers(): Promise<Member[]> {
    return this.memberRepo.find({
      order: {
        no: 'ASC',
      },
      select: {
        no: true,
        name: true,
        job: true,
        isManager: true,
      },
    });
  }

  //단일 멤버 조회
  getOneMember(no: number): Promise<Member | null> {
    const member = this.memberRepo.findOneBy({ no });
    if (!member) {
      throw new NotFoundException(`Member with no ${no} not found`);
    }
    return member;
  }

  //맴버 생성
  createMember(createMemberDTO: CreateMemberDTO) {
    const newMember = this.memberRepo.create(createMemberDTO);
    return this.memberRepo.save(newMember);
  }

  //멤버 수정
  updateMember({ no, data }: UpdateMemberDTO) {
    return this.memberRepo.update(no, { ...data });
  }

  //멤버 삭제
  deleteMember({ no }: DeleteMemberDTO) {
    return this.memberRepo.delete(no);
  }
}

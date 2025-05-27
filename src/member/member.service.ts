import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from './member.entity';
import { Repository } from 'typeorm';
import { CreateMemberDTO, UpdateMemberDTO } from './member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly members: Repository<MemberEntity>,
  ) {}

  //멤버 조회
  getMembers(): Promise<MemberEntity[]> {
    return this.members.find();
  }

  //맴버 생성
  createMember(createMemberDTO: CreateMemberDTO) {
    const newMember = this.members.create(createMemberDTO);
    return this.members.save(newMember);
  }

  //멤버 수정
  updateMember({ id, data }: UpdateMemberDTO) {
    return this.members.update(id, { ...data });
  }
}

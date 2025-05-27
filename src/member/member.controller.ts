import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberEntity } from './member.entity';
import {
  CreateMemberDTO,
  DeleteMemberDTO,
  UpdateMemberInputType,
} from './member.dto';

// Entry Point
@Controller('/member')
export class MemberController {
  constructor(readonly memberService: MemberService) {}

  //멤버 조회
  @Get()
  getMembers(): Promise<MemberEntity[]> {
    return this.memberService.getMembers();
  }

  //단일 멤버 조회
  @Get('/:id')
  getOneMember(@Param('id') id: number): Promise<MemberEntity | null> {
    return this.memberService.getOneMember(id);
  }

  //맴버 생성
  @Post()
  createMember(@Body() postData: CreateMemberDTO) {
    return this.memberService.createMember(postData);
  }

  //멤버 수정
  @Patch('/:id')
  updateMember(
    @Param('id') id: number,
    @Body() pathData: UpdateMemberInputType,
  ) {
    return this.memberService.updateMember({
      id,
      data: pathData,
    });
  }

  //멤버 삭제
  @Delete('/:id')
  deleteMember(@Param('id') id: number) {
    return this.memberService.deleteMember({
      id,
    });
  }
}

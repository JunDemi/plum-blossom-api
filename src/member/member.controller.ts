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
import { Member } from './member.entity';
import {
  CreateMemberDTO,
  UpdateMemberInputType,
} from './member.dto';

// Entry Point
@Controller('/member')
export class MemberController {
  constructor(readonly memberService: MemberService) {}

  //멤버 조회
  @Get()
  getMembers(): Promise<Member[]> {
    return this.memberService.getMembers();
  }

  //단일 멤버 조회
  @Get('/:id')
  getOneMember(@Param('no') no: number): Promise<Member | null> {
    return this.memberService.getOneMember(no);
  }

  //맴버 생성
  @Post()
  createMember(@Body() postData: CreateMemberDTO) {
    return this.memberService.createMember(postData);
  }

  //멤버 수정
  @Patch('/:id')
  updateMember(
    @Param('no') no: number,
    @Body() pathData: UpdateMemberInputType,
  ) {
    return this.memberService.updateMember({
      no,
      data: pathData,
    });
  }

  //멤버 삭제
  @Delete('/:id')
  deleteMember(@Param('no') no: number) {
    return this.memberService.deleteMember({
      no,
    });
  }
}

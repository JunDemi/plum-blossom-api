import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberEntity } from './member.entity';
import { CreateMemberDTO, DeleteMemberDTO, UpdateMemberDTO } from './member.dto';
import { MemberService } from './member.service';

@Resolver((of) => MemberEntity)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  //멤버 조회
  @Query((returns) => [MemberEntity])
  async getMembers(): Promise<MemberEntity[]> {
    return this.memberService.getMembers();
  }

  //멤버 생성
  @Mutation((returns) => Boolean)
  async createMember(
    @Args('input') createMemberDto: CreateMemberDTO,
  ): Promise<boolean> {
    try {
      await this.memberService.createMember(createMemberDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  //멤버 수정
  @Mutation((returns) => Boolean)
  async updateMember(
    @Args('input') updateMemberDto: UpdateMemberDTO,
  ): Promise<boolean> {
    try {
      await this.memberService.updateMember(updateMemberDto);
      return true;
    } catch (e) {
      return true;
    }
  }

  //멤버 삭제
  @Mutation((returns) => Boolean)
  async deleteMember(
    @Args('input') updateMemberDto: DeleteMemberDTO,
  ): Promise<boolean> {
    try {
      await this.memberService.deleteMember(updateMemberDto);
      return true;
    } catch (e) {
      return false;
    }
  }
}

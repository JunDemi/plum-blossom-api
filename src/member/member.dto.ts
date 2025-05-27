import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { MemberEntity } from './member.entity';
import { IsNumber, IsObject } from 'class-validator';

//createMember
@InputType()
export class CreateMemberDTO extends OmitType(MemberEntity, ['id']) {}

//updateMember
@InputType()
export class UpdateMemberInputType extends PartialType(CreateMemberDTO) {}

@InputType()
export class UpdateMemberDTO {
  @Field(() => Number)
  @IsNumber() // <-- Pipe에서 타입을 검증하지 않은 필드는 차단될 수 있음
  id: number;

  @Field(() => UpdateMemberInputType)
  @IsObject() // <-- Pipe에서 타입을 검증하지 않은 필드는 차단될 수 있음
  data: UpdateMemberInputType;
}

//deleteMember
@InputType()
export class DeleteMemberDTO {
  @Field(() => Number)
  @IsNumber() // <-- Pipe에서 타입을 검증하지 않은 필드는 차단될 수 있음
  id: number;
}

import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';

// DTO: 입력값 유효성 검사
export class CreatePlumDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genre: string[];
}

// Update DTO: CreatePlumDto를 상속받아 일부 속성을 선택적으로 업데이트
export class UpdatePlumDto extends PartialType(CreatePlumDto){

}